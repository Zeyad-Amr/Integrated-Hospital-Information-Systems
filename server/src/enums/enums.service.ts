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
      const identityType = await tx.identityType.findMany();
      const genderType = await tx.genderType.findMany();
      const kinshipType = await tx.kinshipType.findMany();
      const roleType = await tx.roleType.findMany();
      const shiftType = await tx.shiftType.findMany();
      const cameFromOptions = await tx.cameFromOptions.findMany();
      const attendantRole = await tx.attendantRole.findMany();
      const triageType = await tx.triageType.findMany();
      const LOC = await tx.lOC.findMany();
      const comorbidities = await tx.comorbidity.findMany();
      const governate = await tx.governate.findMany();
      const department = await tx.department.findMany();
      const features = await tx.feature.findMany();

      return {
        identityType,
        genderType,
        kinshipType,
        roleType,
        shiftType,
        cameFromOptions,
        attendantRole,
        triageType,
        LOC,
        comorbidities,
        governate,
        department,
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
