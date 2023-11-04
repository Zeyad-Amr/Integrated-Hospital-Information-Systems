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
                    }
                }
            }

            return await this.prismaService.$transaction(async (tx) => {

                const incident = await tx.incident.create({ data: incidentData })

                let visitCode = await this.visitRepo.createVisitCode();

                const visitsData = []
                const companionsData = []
                for (let i = 0; i < incidentDto.numerOfPatients; i++) {
                    visitsData.push({ code: visitCode, incidentId: incident.id })
                    const visitNumber = parseInt(visitCode.slice(8)) + 1
                    visitCode = `${visitCode.slice(0, 8)}${visitNumber}`
                }

                incidentDto.companions.forEach((companion) => {
                    companionsData.push({ ...companion, incidentId: incident.id })
                })

                const a = await tx.visit.createMany({ data: visitsData })
                await tx.person.createMany({ data: companionsData, skipDuplicates: true })

                const visits = await tx.visit.findMany({})
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
                    companions: true
                }
            })
        } catch (error) {
            throw error
        }
    }

}