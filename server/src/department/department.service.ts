import { Injectable } from '@nestjs/common';
import { DepartmentRepo } from './department.repo';

@Injectable()
export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepo) {}

  async findAll() {
    try {
      return (await this.departmentRepo.getAll()).items;
    } catch (error) {
      throw error;
    }
  }
}
