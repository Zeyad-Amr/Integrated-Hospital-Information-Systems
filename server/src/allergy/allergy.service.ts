import { Injectable } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { AllergyRepo } from './allergy.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class AllergyService {
  constructor(private allergyRepo: AllergyRepo) {}

  async create(createAllergyDto: CreateAllergyDto, creatorId: string) {
    try {
      const allergy = await this.allergyRepo.addAllergy(createAllergyDto, creatorId);
      return allergy;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const allergy = await this.allergyRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.allergyRepo.includeObj});
      return allergy;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const allergy = await this.allergyRepo.getByID(id);
      return allergy;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAllergyDto: UpdateAllergyDto) {
    try {
      const allergy = await this.allergyRepo.update(id,updateAllergyDto);
      return allergy;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const allergy = await this.allergyRepo.delete(id);
      return allergy;
    } catch (error) {
      throw error;
    }
  }
}
