import { Injectable } from '@nestjs/common';
import { CreateMedicalProblemDto } from './dto/create-medical-problem.dto';
import { UpdateMedicalProblemDto } from './dto/update-medical-problem.dto';
import { MedicalProblemRepo } from './medical-problem.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class MedicalProblemService {
  constructor(private medicalProblemRepo: MedicalProblemRepo) {}

  async create(createMedicalProblemDto: CreateMedicalProblemDto, creatorId: string) {
    try {
      const medicalProblem = await this.medicalProblemRepo.addMedicalProblem(createMedicalProblemDto, creatorId);
      return medicalProblem;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const medicalProblem = await this.medicalProblemRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.medicalProblemRepo.includeObj});
      return medicalProblem;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const medicalProblem = await this.medicalProblemRepo.getByID(id);
      return medicalProblem;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateMedicalProblemDto: UpdateMedicalProblemDto) {
    try {
      const medicalProblem = await this.medicalProblemRepo.update(id,updateMedicalProblemDto);
      return medicalProblem;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const medicalProblem = await this.medicalProblemRepo.delete(id);
      return medicalProblem;
    } catch (error) {
      throw error;
    }
  }
}
