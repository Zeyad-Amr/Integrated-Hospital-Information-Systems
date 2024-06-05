import { Injectable } from '@nestjs/common';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Injectable()
export class EnumsService {
  constructor(private prismaService: PrismaService) { }

  create(createEnumDto: CreateEnumDto) {
    return 'This action adds a new enum';
  }

  async findAll() {
    const enums = await this.prismaService.$transaction(async (tx) => {
      const identityTypes = await tx.identityType.findMany();
      const genderTypes = await tx.genderType.findMany();
      const kinshipTypes = await tx.kinshipType.findMany();
      const roleTypes = await tx.roleType.findMany();
      const shiftTypes = await tx.shiftType.findMany();
      const cameFromOptions = await tx.cameFromOptions.findMany();
      const attendantRoles = await tx.attendantRole.findMany();
      const triageTypes = await tx.triageType.findMany();
      const LOCs = await tx.lOC.findMany();
      const comorbidities = await tx.comorbidity.findMany();
      const governates = await tx.governate.findMany();
      const departments = await tx.department.findMany();
      const features = await tx.feature.findMany();

      return {
        identityTypes,
        genderTypes,
        kinshipTypes,
        roleTypes,
        shiftTypes,
        cameFromOptions,
        attendantRoles,
        triageTypes,
        LOCs,
        comorbidities,
        governates,
        departments,
        features,
      };
    });
    return { enums };
  }

  findOne(id: number) {
    return `This action returns a #${id} enum`;
  }

  update(id: number, updateEnumDto: UpdateEnumDto) {
    return `This action updates a #${id} enum`;
  }

  remove(id: number) {
    return `This action removes a #${id} enum`;
  }
}
