import { Injectable } from '@nestjs/common';
import { DepartmentRepo } from './department.repo';

@Injectable()
export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepo) {}

  async findAll() {
    try {
      return await this.departmentRepo.findAll();
    } catch (error) {
      throw error;
    }
  }
}
