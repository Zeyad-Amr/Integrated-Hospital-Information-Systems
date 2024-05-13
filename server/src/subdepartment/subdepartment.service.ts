import { Injectable } from '@nestjs/common';
import { AssignFeatures, CreateSubdepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubdepartmentDto } from './dto/update-subdepartment.dto';
import { SubDepartmentRepo } from './subdepartment.repo';

@Injectable()
export class SubdepartmentService {
  constructor(private subdepartmentRepo: SubDepartmentRepo) { }
  create(createSubdepartmentDto: CreateSubdepartmentDto) {
    try {
      return this.subdepartmentRepo.create(createSubdepartmentDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.subdepartmentRepo.findAll();
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
      return this.subdepartmentRepo.update(+id, updateSubdepartmentDto);
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
