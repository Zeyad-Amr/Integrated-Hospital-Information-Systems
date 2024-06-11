import { Injectable } from '@nestjs/common';
import { AssignFeatures, CreateSubdepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubdepartmentDto } from './dto/update-subdepartment.dto';
import { SubDepartmentRepo } from './subdepartment.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubdepartmentService {
  constructor(private subdepartmentRepo: SubDepartmentRepo) { }
  IncludeObj: Prisma.SubDepartmentInclude = {
    Department: true,
    specialization: true,
    room: true
  }

  create(createSubdepartmentDto: CreateSubdepartmentDto) {
    try {
      return this.subdepartmentRepo.create(createSubdepartmentDto);
    } catch (error) {
      throw error;
    }
  }

  findAll(
    pagination,
    sort,
    filters,
  ) {
    try {
      return this.subdepartmentRepo.getAll({
        filters,
        sort,
        paginationParams: pagination,
        include: this.IncludeObj
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.subdepartmentRepo.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateSubdepartmentDto: UpdateSubdepartmentDto) {
    try {
      return this.subdepartmentRepo.updateSub(+id, updateSubdepartmentDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    try {
      return this.subdepartmentRepo.remove(+id);
    } catch (error) {
      throw error;
    }
  }

  async assignFeatures(id: string, body: AssignFeatures) {
    try {
      return await this.subdepartmentRepo.assignFeatures(+id, body);
    } catch (error) {
      throw error;
    }
  }
}
