import { Injectable } from '@nestjs/common';
import { Person, PersonType, Prisma } from '@prisma/client';
import { PrismaGenericRepo } from 'src/shared/services/prisma-client/prisma-generic.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PersonRepo extends PrismaGenericRepo<Person> {
  constructor(private readonly prismaService: PrismaService) {
    super('person', prismaService);
  }

  async createIfNotExist(person: CreatePersonDto, type: PersonType): Promise<Person> {
    try {
      const { verificationMethodId, genderId, ...personData } = person
      return await this.prismaService.person.upsert({
        where: { SSN: person.SSN },
        update: {
          ...personData,
        },
        create: {
          ...personData,
          verificationMethod: { connect: { id: verificationMethodId } },
          gender: { connect: { id: genderId } },
          type
        },
        include: this.personInclude
      });
    } catch (error) {
      throw error;
    }
  }

  async findBySSN(ssn: string) {
    try {
      return await this.prismaService.person.findFirst({
        where: { SSN: ssn },
        include: this.personInclude
      });
    } catch (error) {
      throw error;
    }
  }

  personInclude: Prisma.PersonInclude = {
    verificationMethod: true,
    gender: true
  }

}
