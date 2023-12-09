import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateIncidentDto } from "./dto/create-incident.dto";
import { CarNumber, Incident, Person, Prisma, Visit } from "@prisma/client";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { VisitRepo } from "src/visit/visit.repo";
import { Sorting } from "src/shared/decorators/order.decorator";
import { Filter } from "src/shared/decorators/filters.decorator";
import { Pagination } from "src/shared/decorators/pagination.decorator";
import { PaginatedResource } from "src/shared/types/paginated.resource";

@Injectable()
export class IncidentRepo extends PrismaGenericRepo<Incident & { visits: Array<Visit & { patient: Person }> } & { numberOfIncompletedVisits: number }>{
    constructor(private readonly prismaService: PrismaService, private readonly visitRepo: VisitRepo) {
        super('incident', prismaService)
    }

    private includeObj: Prisma.IncidentInclude = {
        // Car: { select: { firstChar: true, secondChar: true, thirdChar: true } }
     visits: { select: { code: true, patient: true, creator: true } }, CompanionsOnIncidents: { select: { companion: true } },
    }

    async createIncident(incidentDto: CreateIncidentDto, creatorId: string) {
        try {
            let incidentData: Prisma.IncidentCreateInput = {numberOfPatients:incidentDto.numerOfPatients};
            if (incidentDto.additionalInfo.notes) {
                // incidentData.Car = {
                //     connectOrCreate: {
                //         create: {
                //             firstChar: incidentDto.additionalInfo.car.firstChar,
                //             secondChar: incidentDto.additionalInfo.car.secondChar,
                //             thirdChar: incidentDto.additionalInfo.car.thirdChar,
                //             number: incidentDto.additionalInfo.car.number
                //         },
                //         where: {
                //             firstChar_secondChar_thirdChar_number: {
                //                 firstChar: incidentDto.additionalInfo.car.firstChar,
                //                 secondChar: incidentDto.additionalInfo.car.secondChar,
                //                 thirdChar: incidentDto.additionalInfo.car.thirdChar,
                //                 number: incidentDto.additionalInfo.car.number
                //             }
                //         },

                //     }
                // }
            }

            // incidentData.notes = incidentDto.additionalInfo.notes;
            // incidentData.CompanionsOnIncidents = {
            //     createMany: { data: [{ companionId: "fads" }], skipDuplicates: true }
            // };
            // incidentData.attendantName = incidentDto.additionalInfo.attendantName;
            // incidentData.attendantID = incidentDto.additionalInfo.attendantID;
            // incidentData.cameFrom = incidentDto.additionalInfo.cameFrom;
            // incidentData.injuryCause = incidentDto.additionalInfo.injuryCause;
            // incidentData.injuryLocation = incidentDto.additionalInfo.injuryLocation;

            return await this.prismaService.$transaction(async (tx) => {


                await tx.person.createMany({ data: incidentDto.companions, skipDuplicates: true })
                const companionsSSNs = incidentDto.companions.map((c) => c.SSN)

                const companions = await this.prismaService.person.findMany({ where: { SSN: { in: companionsSSNs } } })


                const companionsIds: Prisma.CompanionsOnIncidentsCreateManyIncidentInput[] = companions.map((c) => { return { companionId: c.id } })

                const incident = await tx.incident.create({
                    data: {
                        ...incidentData, CompanionsOnIncidents: {
                            createMany: { data: companionsIds, skipDuplicates: true }
                        }
                    }
                })

                let visitCode = await this.visitRepo.createVisitCode();

                const visitsData = []
                for (let i = 0; i < incidentDto.numerOfPatients; i++) {
                    visitsData.push({ code: visitCode, incidentId: incident.id, creatorId: creatorId })
                    const visitNumber = parseInt(visitCode.slice(8)) + 1
                    visitCode = `${visitCode.slice(0, 8)}${visitNumber}`
                }

                await tx.visit.createMany({ data: visitsData })

                const visitsCodes = visitsData.map((visit) => visit.code)

                return { incident, visitsCodes }
            })

        }
        catch (error) {
            throw error
        }
    }

    async getById(id: string) {
        try {
            const incident: any = await this.prismaService.incident.findFirst({
                where: { id: id },
                include: this.includeObj
            })
            incident.numberOfIncompletedVisits = 0
            incident.visits.forEach((visit) => {
                if (visit.patient == null)
                    incident.numberOfIncompletedVisits++
            })

            return incident
        } catch (error) {
            throw error

        }
    }

    async findAll(paginationParams: Pagination, filters: Array<Filter>, sort: Sorting) {

        try {
            const incidents = await this.getAll({ paginationParams, filters, sort, include: this.includeObj });
            incidents.items.forEach((incident) => {
                incident.numberOfIncompletedVisits = 0
                incident.visits.forEach((visit) => {

                    if (visit.patient == null)
                        incident.numberOfIncompletedVisits++
                })
            })
            return incidents
        } catch (error) {

        }

    }

}