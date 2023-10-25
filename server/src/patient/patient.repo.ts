import { Injectable } from "@nestjs/common";
import { PrismaService } from "../shared/services/prisma-client/prisma.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { Person } from "@prisma/client";
import { PersonRepo } from "src/person/person.repo";

@Injectable()
export class PatientRepo extends PrismaGenericRepo<Person> {

    constructor(private prismaService: PrismaService, private readonly personRepo: PersonRepo) {
        super('person', prismaService)
    }

    async createPatientWithVisit(createPatientDto: CreatePatientDto) {
        try {

            return await this.prismaService.$transaction(async (tx) => {
                const patient = await this.personRepo.createIfNotExist(createPatientDto.patient)

                const companion = await this.personRepo.createIfNotExist(createPatientDto.companion)

                const visit = await this.prismaService.visit.create({ data: { ...createPatientDto.visit, creatorId: "should be request user id", patientId: patient.id, companionId: companion.id } })
                return { patient, companion, visit }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    async findAll() {
        try {
            return await this.prismaService.$queryRaw`SELECT DISTINCT ON (p."id") p."firstName", p."secondName", p."thirdName", p."fourthName", p."SSN", p."verificationMethod", p."gender", p."phone", p."email", p."birthDate", p."governate", p."address", p."createdAt", p."updatedAt"
            FROM "Person" AS "p" INNER JOIN "Visit" AS "v" ON p."id" = v."patientId"`;

        } catch (error) {
            throw error
        }
    }
}