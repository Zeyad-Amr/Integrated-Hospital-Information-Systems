import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { AnonymousVisitDto, CreateVisitDto } from "./dto/create-visit.dto";
import { Person, Visit } from "@prisma/client";
import { PersonRepo } from "src/person/person.repo";

@Injectable()
export class VisitRepo {
    constructor(private readonly prismaService: PrismaService, private readonly personRepo: PersonRepo) { }

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

    async createPatientWithVisit(createPatientDto: CreateVisitDto): Promise<any> {
        try {

            return await this.prismaService.$transaction(async (tx) => {
                const patient = await this.personRepo.createIfNotExist(createPatientDto.patient)

                let companion: Person;
                if (createPatientDto.companion) {
                    companion = await this.personRepo.createIfNotExist(createPatientDto.companion)
                }

                const visitCode = await this.createVisitCode()
                const visit = await this.prismaService.visit.create({
                    data: {
                        ...createPatientDto.visit,
                        code: visitCode,
                        creatorId: "should be request user id",
                        patientId: patient.id,
                        companionId: companion?.id
                    }
                })

                return { patient, companion, visit }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    async createAnonymous(anonymousVisitDto: AnonymousVisitDto) {
        try {

            const visitCode = await this.createVisitCode()

            if (anonymousVisitDto.companion) {
                const companion = await this.personRepo.createIfNotExist(anonymousVisitDto.companion)
                const visit = await this.prismaService.visit.create({
                    data: {
                        code: visitCode,
                        sequenceNumber: anonymousVisitDto.sequenceNumber,
                        kinship: anonymousVisitDto.kinship,

                        companion: {
                            connect: {
                                id: companion?.id
                            }
                        }
                    }
                })
                return { companion, visit }
            }
            // should add creator id here
            //BUG
            return await this.prismaService.visit.create({
                data: {
                    code: visitCode,
                    sequenceNumber: anonymousVisitDto.sequenceNumber,
                    kinship: anonymousVisitDto.kinship,
                }
            })
        } catch (error) {
            throw error
        }
    }

    async findByVisitCode(visitCode: string) {
        try {
            return await this.prismaService.visit.findFirst({
                where: {
                    code: visitCode
                }
            })
        } catch (error) {
            throw error
        }
    }
}