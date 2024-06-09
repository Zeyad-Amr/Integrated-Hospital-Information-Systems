import { Injectable } from '@nestjs/common';
import { CreateVitalDto } from './dto/create-vital.dto';
import { UpdateVitalDto } from './dto/update-vital.dto';
import { VitalsRepo } from './vitals.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class VitalsService {
  constructor(private vitalsRepo: VitalsRepo) {}

  async create(createVitalDto: CreateVitalDto, creatorId: string) {
    try {
      const vitals = await this.vitalsRepo.addVitals(createVitalDto, creatorId);
      return vitals;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const vitals = await this.vitalsRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.vitalsRepo.includeObj});
      return vitals;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const vitals = await this.vitalsRepo.getByID(id);
      return vitals;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateVitalDto: UpdateVitalDto) {
    try {
      const vitals = await this.vitalsRepo.update(id,updateVitalDto);
      return vitals;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const vitals = await this.vitalsRepo.delete(id);
      return vitals;
    } catch (error) {
      throw error;
    }
  }
}
