import { Injectable, NotFoundException } from '@nestjs/common';
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
      const { verificationMethodId, genderId, governateId, ...personData } = person
      return await this.prismaService.person.upsert({
        where: { SSN: person.SSN },
        update: {
          ...personData,
        },
        create: {
          ...personData,
          verificationMethod: { connect: { id: verificationMethodId } },
          governate: governateId ? { connect: { id: governateId } } : undefined,
          gender: { connect: { id: genderId } },
          type,
          fullName: `${person.firstName} ${person.secondName} ${person.thirdName} ${person.fourthName}`
        },
        include: this.personInclude
      });
    } catch (error) {
      throw error;
    }
  }

  async findBySSN(ssn: string) {
    try {
      const res = await this.prismaService.person.findUnique({
        where: { SSN: ssn },
        include: this.personInclude
      });
      if (!res)
        throw new NotFoundException()
      return res
    } catch (error) {
      throw error;
    }
  }

  personInclude: Prisma.PersonInclude = {
    verificationMethod: true,
    gender: true,
    governate: true,
  }

}
