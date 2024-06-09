import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { PrescriptionRepo } from './prescription.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class PrescriptionService {
  constructor(private prescriptionRepo: PrescriptionRepo) {}

  async create(createPrescriptionDto: CreatePrescriptionDto, creatorId: string) {
    try {
      const prescription = await this.prescriptionRepo.addPrescription(createPrescriptionDto, creatorId);
      return prescription;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const prescription = await this.prescriptionRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.prescriptionRepo.includeObj});
      return prescription;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const prescription = await this.prescriptionRepo.getByID(id);
      return prescription;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    try {
      const prescription = await this.prescriptionRepo.update(id,updatePrescriptionDto);
      return prescription;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const prescription = await this.prescriptionRepo.delete(id);
      return prescription;
    } catch (error) {
      throw error;
    }
  }
}
