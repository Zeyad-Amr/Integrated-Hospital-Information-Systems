import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import {
  Attendant,
  Companion,
  Patient,
  Person,
  PersonType,
  Prisma,
  Visit,
  VisitAdditionalInformation,
} from '@prisma/client';
import { PersonRepo } from 'src/person/person.repo';
import { PrismaGenericRepo } from 'src/shared/services/prisma-client/prisma-generic.repo';
import { isEmptyObject } from 'src/shared/util.functions.ts/general.utils';
import { TriageAXDto } from './dto/triage-assessment.dto';

@Injectable()
export class VisitRepo extends PrismaGenericRepo<Visit> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly personRepo: PersonRepo,
  ) {
    super('visit', prismaService);
  }

  async createVisitCode(): Promise<string> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastCreatedVisit: Visit[] = await this.prismaService
      .$queryRaw`SELECT * FROM "Visit" 
                WHERE "createdAt" >= ${today}
                AND
                "createdAt"< CURRENT_DATE + INTERVAL '1 day'
                ORDER BY CAST(SUBSTRING(code, 9) AS integer) DESC
                LIMIT 1`;

    let sequenceNumber = 1;
    if (lastCreatedVisit.length != 0) {
      sequenceNumber = parseInt(lastCreatedVisit[0].code.slice(8)) + 1;
    }
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const code: string = `${today.getFullYear()}${month}${day}${sequenceNumber}`;
    return code;
  }

  async createPatientWithVisit(
    createVisitDto: CreateVisitDto,
    creatorId: string,
  ): Promise<any> {
    try {
      let car = undefined;
      if (createVisitDto?.additionalInfo?.car) {
        car = {
          connectOrCreate: {
            create: {
              firstChar: createVisitDto.additionalInfo.car.firstChar,
              secondChar: createVisitDto.additionalInfo.car.secondChar,
              thirdChar: createVisitDto.additionalInfo.car.thirdChar,
              number: createVisitDto.additionalInfo.car.number,
            },
            where: {
              firstChar_secondChar_thirdChar_number: {
                firstChar: createVisitDto.additionalInfo.car.firstChar,
                secondChar: createVisitDto.additionalInfo.car.secondChar,
                thirdChar: createVisitDto.additionalInfo.car.thirdChar,
                number: createVisitDto.additionalInfo.car.number,
              },
            },
          },
        };
      }
      // ======================================== Start of transaction =========================================================
      const visit = await this.prismaService.$transaction(async (tx) => {
        try {
          let additionalInfo: VisitAdditionalInformation;
          let connectAdditionalInfo;
          if (
            createVisitDto.additionalInfo &&
            !isEmptyObject(createVisitDto.additionalInfo)
          ) {
            let attendant: Attendant;
            let connectAttendant;
            if (createVisitDto.additionalInfo?.attendant) {
              attendant = await tx.attendant.findFirst({
                where: {
                  OR: [
                    { SSN: createVisitDto.additionalInfo.attendant.SSN },
                    { cardId: createVisitDto.additionalInfo.attendant.id },
                  ],
                },
              });
              if (!attendant) {
                attendant = await tx.attendant.create({
                  data: {
                    name: createVisitDto.additionalInfo.attendant.name,
                    SSN: createVisitDto.additionalInfo.attendant.SSN,
                    cardId: createVisitDto.additionalInfo.attendant.id,
                    attendantRoleId:
                      createVisitDto.additionalInfo.attendant.roleId ?
                        createVisitDto.additionalInfo.attendant.roleId : undefined,
                  },
                });
              }
              connectAttendant = {
                connect: { id: attendant?.id },
              };
            }
            additionalInfo = await tx.visitAdditionalInformation.create({
              data: {
                Car: car,
                cameFrom: createVisitDto.additionalInfo.cameFromId ?
                  { connect: { id: createVisitDto.additionalInfo.cameFromId } }
                  : undefined,
                notes: createVisitDto.additionalInfo.notes,
                injuryCause: createVisitDto.additionalInfo.injuryCause,
                injuryLocation: createVisitDto.additionalInfo.injuryCause,
                Attendant: connectAttendant,
              },
            });
            connectAdditionalInfo = {
              connect: { id: additionalInfo?.id },
            };
          }
          // ======================================== Patient =========================================================
          let patient: Patient;
          let person: Person;
          let patientConnect: Prisma.PatientWhereUniqueInput;
          if (createVisitDto.patient?.SSN) {
            person = await this.personRepo.findBySSN(createVisitDto.patient.SSN)
          }

          console.log(person);
          if (person?.type !== PersonType.PATIENT) {
            const { verificationMethodId, genderId, ...personalData } = createVisitDto.patient
            patient = await tx.patient.create({
              data: {
                person: {
                  connectOrCreate: {
                    where: {
                      SSN: createVisitDto.patient.SSN ? createVisitDto.patient.SSN : ""
                    },
                    create: {
                      ...personalData,
                      verificationMethod: verificationMethodId ? { connect: { id: verificationMethodId } } : undefined,
                      gender: { connect: { id: genderId } },
                      type: PersonType.PATIENT
                    }
                  }
                }
              }
            })
            patientConnect = {
              id: patient.id,
            }
          } else {
            patientConnect = {
              personId: person.id
            }
          }
          // ======================================== Companion =========================================================
          let companion: Companion;
          let companionConnect: Prisma.CompanionWhereUniqueInput;
          if (createVisitDto.companion) {
            const { verificationMethodId, genderId, kinshipId, ...personalData } = createVisitDto.companion
            const person = await this.personRepo.findBySSN(createVisitDto.companion.SSN)
            if (person?.type !== PersonType.COMPANION) {
              companion = await tx.companion.create({
                data: {
                  kinship: { connect: { id: kinshipId } },
                  person: {
                    connectOrCreate: {
                      where: { SSN: createVisitDto.companion.SSN },
                      create: {
                        ...personalData,
                        verificationMethod: verificationMethodId ? { connect: { id: verificationMethodId } } : undefined,
                        gender: { connect: { id: genderId } },
                        type: PersonType.COMPANION
                      }
                    }
                  }
                }
              })
              companionConnect = companion?.id ? {
                id: companion.id,
              } : undefined
            } else {
              companionConnect = {
                personId: person.id
              }
            }
          }
          // ======================================== Create Visit  =========================================================
          const visitCode = await this.createVisitCode();
          const visit = await tx.visit.create({
            data: {
              ...createVisitDto.visit,
              code: visitCode,
              creator: {
                connect: { id: creatorId },
              },
              patient: {
                connect: patientConnect,
              },
              companion: {
                connect: companionConnect,
              },
              AdditionalInformation: connectAdditionalInfo,
            },
            include: this.visitIncludes
          });

          return { visit };
        } catch (error) {
          throw error;
        }
      });
      return visit;
    } catch (error) {
      throw error;
    }
  }

  async findByVisitCode(visitCode: string) {
    try {
      return await this.prismaService.visit.findUniqueOrThrow({
        where: {
          code: visitCode,
        },
        include: this.visitIncludes,
      });
    } catch (error) {
      throw error;
    }
  }

  async addTriageAss(code: string, data: TriageAXDto) {
    try {
      const visit = await this.prismaService.visit.findUnique({
        where: {
          code,
        },
        select: { patientId: true },
      });
      let updatedVisit;
      if (visit) {
        updatedVisit = await this.prismaService.visit.update({
          where: { code },
          data: {
            medicalRecord: {
              create: {
                mainComplaint: data.mainComplaint,
                consciousnessLevel: data.LOCId ? { connect: { id: data.LOCId } } : undefined,
                triage: data.triageTypeId ? { connect: { id: data.triageTypeId } } : undefined,
                vitals: {
                  create: {
                    ...data.vitals
                  }
                },
                Patient: { connect: { id: visit.patientId } }
              }
            },
            transfers: {
              create: {
                from: "ER Area",
                to: data.transferTo
              }
            },
            patient: {
              update: {
                comorbidities: { connect: this.connectIdsArr(data.comorbidityIds) }
              }
            }
          },
          include: this.triageIncludes
        })
      }
      return updatedVisit
    } catch (error) {
      throw error;
    }
  }

  connectIdsArr = (ids: number[] | undefined) => {
    if (!ids) {
      return []
    }
    let arr: { id: number }[] = [];
    ids.map((id) => {
      arr.push({
        id: id,
      })
    })
    return arr
  }

  async findAll() {
    try {
      return await this.prismaService.visit.findMany({
        include: { companion: true },
      });
    } catch (error) {
      throw error;
    }
  }

  visitIncludes: Prisma.VisitInclude =
    {
      patient: { include: { person: { include: { verificationMethod: true, gender: true } }, comorbidities: true } },
      companion: { include: { person: { include: { verificationMethod: true, gender: true } }, kinship: true } },
      creator: { include: { person: { include: { verificationMethod: true, gender: true } }, department: true, role: true, shift: true } },
      AdditionalInformation: { include: { Attendant: { include: { attendantRole: true } }, Car: true, cameFrom: true } },
      incident: true,
    }

  triageIncludes: Prisma.VisitInclude = {
    ...this.visitIncludes,
    medicalRecord: { include: { vitals: true, consciousnessLevel: true, triage: true } },
    transfers: true,
  }
}
