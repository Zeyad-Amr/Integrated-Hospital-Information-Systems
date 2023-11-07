import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateIncidentDto } from "./dto/create-incident.dto";
import { CarNumber, Incident, Prisma, Visit } from "@prisma/client";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { VisitRepo } from "src/visit/visit.repo";

@Injectable()
export class IncidentRepo {
    constructor(private readonly prismaService: PrismaService, private readonly visitRepo: VisitRepo) {
    }

    async create(incidentDto: CreateIncidentDto) {
        try {
            let incidentData: Prisma.IncidentCreateInput;
            if (!incidentDto.car) {
                incidentData = {
                    numberOfPatients: incidentDto.numerOfPatients,
                    description: incidentDto.describtion,
                }
            }
            else {
                incidentData = {
                    numberOfPatients: incidentDto.numerOfPatients,
                    description: incidentDto.describtion,
                    Car: {
                        connectOrCreate: {
                            create: {
                                firstChar: incidentDto.car.firstChar,
                                secondChar: incidentDto.car.secondChar,
                                thirdChar: incidentDto.car.thirdChar,
                                number: incidentDto.car.number
                            },
                            where: {
                                firstChar_secondChar_thirdChar_number: {
                                    firstChar: incidentDto.car.firstChar,
                                    secondChar: incidentDto.car.secondChar,
                                    thirdChar: incidentDto.car.thirdChar,
                                    number: incidentDto.car.number
                                }
                            },

                        }
                    }, CompanionsOnIncidents: {
                        createMany: { data: [{ companionId: "fads" }], skipDuplicates: true }
                    }
                }
            }

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
                    visitsData.push({ code: visitCode, incidentId: incident.id })
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

    async getAll() {
        try {
            return await this.prismaService.incident.findMany({
                include: {
                    Car: true,
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getById(id: string) {
        try {
            return await this.prismaService.incident.findFirst({
                where: { id: id },
                include: {
                    Car: { select: { firstChar: true, secondChar: true, thirdChar: true } }
                    , visits: { select: { code: true, patient: true, creator: true } }, CompanionsOnIncidents: { select: { companion: true } }
                }
            })
        } catch (error) {
            throw error

        }
    }

}