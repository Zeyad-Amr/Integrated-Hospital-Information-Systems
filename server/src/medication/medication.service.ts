import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { MedicationRepo } from './medication.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class MedicationService {
  constructor(private medicationRepo: MedicationRepo) {}

  async create(createMedicationDto: CreateMedicationDto, creatorId: string) {
    try {
      const medication = await this.medicationRepo.addMedication(createMedicationDto, creatorId);
      return medication;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const medication = await this.medicationRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.medicationRepo.includeObj});
      return medication;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const medication = await this.medicationRepo.getByID(id);
      return medication;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    try {
      const medication = await this.medicationRepo.update(id,updateMedicationDto);
      return medication;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const medication = await this.medicationRepo.delete(id);
      return medication;
    } catch (error) {
      throw error;
    }
  }
}
