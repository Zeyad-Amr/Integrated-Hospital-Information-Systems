import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreateVisitDto } from "./dto/create-visit.dto";
import { Attendant, Person, Prisma, Visit, VisitAdditionalInformation } from "@prisma/client";
import { PersonRepo } from "src/person/person.repo";
import { Pagination } from "src/shared/decorators/pagination.decorator";
import { PaginatedResource } from "src/shared/types/paginated.resource";
import { Filter } from "src/shared/decorators/filters.decorator";
import { Sorting } from "src/shared/decorators/order.decorator";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { isEmpty } from "class-validator";
import { isEmptyObject } from "src/shared/util.functions.ts/general.utils";

@Injectable()
export class VisitRepo extends PrismaGenericRepo<Visit>{
    constructor(private readonly prismaService: PrismaService, private readonly personRepo: PersonRepo) {
        super('visit', prismaService)
    }

    async createVisitCode(): Promise<string> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastCreatedVisit: Visit[] = await this.prismaService.$queryRaw`SELECT * FROM "Visit" 
                                                                                    WHERE "createdAt" >= ${today}
                                                                                    AND
                                                                                    "createdAt"< CURRENT_DATE + INTERVAL '1 day'
                                                                                    ORDER BY CAST(SUBSTRING(code, 9) AS integer) DESC
                                                                                    LIMIT 1`



        let sequenceNumber = 1
        if (lastCreatedVisit.length != 0) {
            sequenceNumber = parseInt(lastCreatedVisit[0].code.slice(8)) + 1
        }
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const day = today.getDate().toString().padStart(2, '0')
        const code: string = `${today.getFullYear()}${month}${day}${sequenceNumber}`
        return code

    }

    async createPatientWithVisit(createPatientDto: CreateVisitDto, creatorId: string): Promise<any> {
        try {
            let car = undefined
            if (createPatientDto?.additionalInfo?.car) {
                car = {
                    connectOrCreate: {
                        create: {
                            firstChar: createPatientDto.additionalInfo.car.firstChar,
                            secondChar: createPatientDto.additionalInfo.car.secondChar,
                            thirdChar: createPatientDto.additionalInfo.car.thirdChar,
                            number: createPatientDto.additionalInfo.car.number
                        },
                        where: {
                            firstChar_secondChar_thirdChar_number: {
                                firstChar: createPatientDto.additionalInfo.car.firstChar,
                                secondChar: createPatientDto.additionalInfo.car.secondChar,
                                thirdChar: createPatientDto.additionalInfo.car.thirdChar,
                                number: createPatientDto.additionalInfo.car.number
                            }
                        },

                    }
                }
            }


            const visit = await this.prismaService.$transaction(async (tx) => {
                try {
                    let additionalInfo: VisitAdditionalInformation
                    let connectAdditionalInfo
                    if (createPatientDto.additionalInfo && !isEmptyObject(createPatientDto.additionalInfo)) {

                        let attendant: Attendant
                        let connectAttendant
                        if (createPatientDto.additionalInfo?.attendant) {

                            attendant = await tx.attendant.findFirst({
                                where: {
                                    OR: [
                                        { SSN: createPatientDto.additionalInfo.attendant.SSN },
                                        { cardId: createPatientDto.additionalInfo.attendant.id }
                                    ]
                                }
                            })
                            if (!attendant) {
                                attendant = await tx.attendant.create({
                                    data: {

                                        name: createPatientDto.additionalInfo.attendant.name,
                                        SSN: createPatientDto.additionalInfo.attendant.SSN,
                                        cardId: createPatientDto.additionalInfo.attendant.id,
                                        attendantRole: createPatientDto.additionalInfo.attendant.role

                                    }
                                })
                            }

                            connectAttendant = {
                                connect: { id: attendant?.id }
                            }
                        }
                        additionalInfo = await tx.visitAdditionalInformation.create({
                            data: {
                                Car: car,
                                cameFrom: createPatientDto.additionalInfo.cameFrom,
                                notes: createPatientDto.additionalInfo.notes,
                                injuryCause: createPatientDto.additionalInfo.injuryCause,
                                injuryLocation: createPatientDto.additionalInfo.injuryCause,
                                Attendant: connectAttendant
                            }
                        })

                        connectAdditionalInfo = {
                            connect: { id: additionalInfo?.id }
                        }
                    }
                    if (!createPatientDto.patient?.SSN) {
                        createPatientDto.patient.SSN = null
                    }

                    const patient = await this.personRepo.createIfNotExist(createPatientDto.patient)
                    let companion: Person;
                    let companionConnect;
                    if (createPatientDto.companion) {
                        companion = await this.personRepo.createIfNotExist(createPatientDto.companion)
                        companionConnect = {
                            connect: {
                                id: companion?.id
                            }
                        }
                    }

                    const visitCode = await this.createVisitCode()
                    const visit = await tx.visit.create({
                        data: {
                            ...createPatientDto.visit,
                            code: visitCode,
                            creator: {
                                connect: { id: creatorId }
                            },
                            patient: {
                                connect: {
                                    id: patient.id
                                }
                            },
                            companion: companionConnect, AdditionalInformation: connectAdditionalInfo
                        }
                    })

                    return { patient, companion, visit }
                } catch (error) {
                    throw error
                }
            })
            return visit
        }
        catch (error) {
            throw error
        }
    }


    async findByVisitCode(visitCode: string) {
        try {

            return await this.prismaService.visit.findFirst({
                where: {
                    code: visitCode
                }, include: {
                    patient: true,
                    companion: true,
                    creator: true,
                    incident: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            return await this.prismaService.visit.findMany({ include: { companion: true } })
        } catch (error) {
            throw error
        }
    }
}