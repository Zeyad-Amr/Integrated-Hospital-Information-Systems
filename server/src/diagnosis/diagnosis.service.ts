import { Injectable } from '@nestjs/common';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { DiagnosisRepo } from './diagnosis.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class DiagnosisService {
  constructor(private diagnosisRepo: DiagnosisRepo) {}

  async create(createDiagnosisDto: CreateDiagnosisDto, creatorId: string) {
    try {
      const diagnosis = await this.diagnosisRepo.addDiagnosis(createDiagnosisDto, creatorId);
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const diagnosis = await this.diagnosisRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.diagnosisRepo.includeObj});
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const diagnosis = await this.diagnosisRepo.getByID(id);
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateDiagnosisDto: UpdateDiagnosisDto) {
    try {
      const diagnosis = await this.diagnosisRepo.update(id,updateDiagnosisDto);
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const diagnosis = await this.diagnosisRepo.delete(id);
      return diagnosis;
    } catch (error) {
      throw error;
    }
  }
}
