import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import {
  Attendant,
  Incident,
  Patient,
  Person,
  Prisma,
  Visit,
  VisitAdditionalInformation,
} from '@prisma/client';
import { PrismaGenericRepo } from 'src/shared/services/prisma-client/prisma-generic.repo';
import { VisitRepo } from 'src/visit/visit.repo';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { isEmptyObject } from 'src/shared/util.functions.ts/general.utils';

@Injectable()
export class IncidentRepo extends PrismaGenericRepo<
  Incident & { visits: Array<Visit & { patient: Patient & { person: Person } }> } & {
    numberOfIncompletedVisits: number;
  }
> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly visitRepo: VisitRepo,
  ) {
    super('incident', prismaService);
  }

  private includeObj: Prisma.IncidentInclude = {
    // Car: { select: { firstChar: true, secondChar: true, thirdChar: true } }
    visits: {
      select: {
        code: true,
        patient: {
          include: {
            person: true
          }
        },
        creator: true
      }
    },
    CompanionsOnIncidents: {
      select: {
        companion: {
          include: {
            person: true,
            kinship: true,
          }
        }
      }
    },
    AdditionalInformation: {
      include: {
        Car: true,
        Attendant: true,
        cameFrom: true,
      }
    },
  };

  async createIncident(incidentDto: CreateIncidentDto, creatorId: string) {
    try {
      let car;
      if (incidentDto.additionalInfo?.car) {
        car = {
          connectOrCreate: {
            create: {
              firstChar: incidentDto.additionalInfo.car.firstChar,
              secondChar: incidentDto.additionalInfo.car.secondChar,
              thirdChar: incidentDto.additionalInfo.car.thirdChar,
              number: incidentDto.additionalInfo.car.number,
            },
            where: {
              firstChar_secondChar_thirdChar_number: {
                firstChar: incidentDto.additionalInfo.car.firstChar,
                secondChar: incidentDto.additionalInfo.car.secondChar,
                thirdChar: incidentDto.additionalInfo.car.thirdChar,
                number: incidentDto.additionalInfo.car.number,
              },
            },
          },
        };
      }

      return await this.prismaService.$transaction(async (tx) => {
        let additionalInfo: VisitAdditionalInformation;
        let connectAdditionalInfo;

        // ======================================== Additional Info =========================================================
        if (
          incidentDto.additionalInfo &&
          !isEmptyObject(incidentDto.additionalInfo)
        ) {

          // * Attendant 
          let attendant: Attendant;
          let connectAttendant;
          if (incidentDto.additionalInfo?.attendant) {
            attendant = await tx.attendant.findFirst({
              where: {
                OR: [
                  { SSN: incidentDto.additionalInfo.attendant.SSN },
                  { cardId: incidentDto.additionalInfo.attendant.id },
                ],
              },
            });
            if (!attendant) {
              attendant = await tx.attendant.create({
                data: {
                  name: incidentDto.additionalInfo.attendant.name,
                  SSN: incidentDto.additionalInfo.attendant.SSN,
                  cardId: incidentDto.additionalInfo.attendant.id,
                  attendantRoleId: incidentDto.additionalInfo.attendant.roleId,
                },
              });
            }

            connectAttendant = {
              connect: { id: attendant?.id },
            };
          }
          // * Create Additional Info
          additionalInfo = await tx.visitAdditionalInformation.create({
            data: {
              Car: car,
              cameFrom:
              {
                connect: {
                  id: incidentDto.additionalInfo.cameFromId,
                }
              },
              notes: incidentDto.additionalInfo.notes,
              injuryCause: incidentDto.additionalInfo.injuryCause,
              injuryLocation: incidentDto.additionalInfo.injuryCause,
              Attendant: connectAttendant,
            },
          });

          connectAdditionalInfo = {
            connect: { id: additionalInfo?.id },
          };
        }

        // ======================================== Companions =========================================================

        await tx.person.createMany({
          data: incidentDto.companions.map((companion) => {
            let { kinshipId, ...personalData } = companion
            return { ...personalData, fullName: `${companion.firstName} ${companion.secondName} ${companion.thirdName} ${companion.fourthName}` }
          }),
          skipDuplicates: true,
        });
        const companionsSSNs = incidentDto.companions.map((c) => c.SSN);

        const companionsPersonal = await tx.person.findMany({
          where: { SSN: { in: companionsSSNs } },
        });

        const companionsPersonIds: { personId: string, kinshipId: number }[] =
          companionsPersonal.map((c) => {
            return {
              personId: c.id, kinshipId:
                incidentDto.companions.find((comp) => comp.SSN === c.SSN).kinshipId
            };
          });

        await tx.companion.createMany({
          data: companionsPersonIds,
          skipDuplicates: true
        });

        const companions = await tx.companion.findMany({
          where: { person: { SSN: { in: companionsSSNs } } },
        });

        const companionsIds =
          companions.map((c) => {
            return { companionId: c.id };
          });

        // * Create Incident
        const incident = await tx.incident.create({
          data: {
            numberOfPatients: incidentDto.numberOfPatients,
            AdditionalInformation: connectAdditionalInfo,
            CompanionsOnIncidents: {
              createMany: {
                data: companionsIds,
                skipDuplicates: true,
              },
            },
          },
        });

        // * Create visits for each patient
        let visitCode = await this.visitRepo.createVisitCode();

        const visitsData = [];
        for (let i = 0; i < incidentDto.numberOfPatients; i++) {
          visitsData.push({
            code: visitCode,
            incidentId: incident.id,
            creatorId: creatorId,
          });
          const visitNumber = parseInt(visitCode.slice(8)) + 1;
          visitCode = `${visitCode.slice(0, 8)}${visitNumber}`;
        }

        await tx.visit.createMany({ data: visitsData });

        const visitsCodes = visitsData.map((visit) => visit.code);

        return { incident, visitsCodes };
      });
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const incident: any = await this.prismaService.incident.findFirst({
        where: { id: id },
        include: this.includeObj,
      });
      incident.numberOfIncompletedVisits = 0;
      incident.visits.forEach((visit) => {
        if (visit.patient == null) incident.numberOfIncompletedVisits++;
      });

      return incident;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters: Array<Filter>,
    sort: Sorting,
  ) {
    try {
      const incidents = await this.getAll({
        paginationParams,
        filters,
        sort,
        include: this.includeObj,
      });
      incidents.items.forEach((incident) => {
        incident.numberOfIncompletedVisits = 0;
        incident.visits.forEach((visit) => {
          if (visit.patient == null || visit.patient?.person?.SSN == null) incident.numberOfIncompletedVisits++;
        });
      });
      return incidents;
    } catch (error) { }
  }
}
