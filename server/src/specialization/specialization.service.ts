import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { SpecializationRepo } from './specialization.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpecializationService {
  constructor(private specializationRepo: SpecializationRepo) { }
  create(createSpecializationDto: CreateSpecializationDto) {
    try {
      return this.specializationRepo.createSpecialization(createSpecializationDto);
    } catch (error) {
      throw error;
    }
  }
  include: Prisma.SpecializationInclude = {
    SubDepartment: true
  }

  findAll(
    pagination,
    sort,
    filters,
  ) {
    try {
      return this.specializationRepo.getAll(
        {
          include: this.include,
          filters,
          sort,
          paginationParams: pagination
        }
      );
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.specializationRepo.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateSpecializationDto: UpdateSpecializationDto) {
    try {
      return this.specializationRepo.updateSpecialization(+id, updateSpecializationDto);
    } catch (error) {
      throw error;
    }
  }


  remove(id: string) {
    try {
      return this.specializationRepo.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
