import { Injectable } from '@nestjs/common';
import { CreateSurgeryDto } from './dto/create-surgery.dto';
import { UpdateSurgeryDto } from './dto/update-surgery.dto';
import { SurgeryRepo } from './surgery.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class SurgeryService {
  constructor(private surgeryRepo: SurgeryRepo) {}

  async create(createSurgeryDto: CreateSurgeryDto, creatorId: string) {
    try {
      const surgery = await this.surgeryRepo.addSurgery(createSurgeryDto, creatorId);
      return surgery;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const surgery = await this.surgeryRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.surgeryRepo.includeObj});
      return surgery;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const surgery = await this.surgeryRepo.getByID(id);
      return surgery;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSurgeryDto: UpdateSurgeryDto) {
    try {
      const surgery = await this.surgeryRepo.update(id,updateSurgeryDto);
      return surgery;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const surgery = await this.surgeryRepo.delete(id);
      return surgery;
    } catch (error) {
      throw error;
    }
  }
}
