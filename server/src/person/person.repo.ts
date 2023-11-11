import { Injectable } from "@nestjs/common";
import { Person } from "@prisma/client";
import { PrismaGenericRepo } from "src/shared/services/prisma-client/prisma-generic.repo";
import { PrismaService } from "src/shared/services/prisma-client/prisma.service";
import { CreatePersonDto } from "./dto/create-person.dto";


@Injectable()
export class PersonRepo extends PrismaGenericRepo<Person>{
    constructor(private readonly prismaService: PrismaService) {
        super('person', prismaService)
    }

    async createIfNotExist(person: CreatePersonDto): Promise<Person> {
        try {

            return await this.prismaService.person.upsert({
                where: { SSN: person.SSN }, update: {
                    ...person
                }, create: {
                    ...person
                }
            })
        } catch (error) {
            throw error
        }
    }

    async findBySSN(ssn: string) {
        try {
            return await this.prismaService.person.findFirst({
                where: { SSN: ssn }
            })
        } catch (error) {
            throw error
        }
    }
}