import { Injectable } from '@nestjs/common';
import { CreateTriageAxDto } from './dto/create-triage-ax.dto';
import { UpdateTriageAxDto } from './dto/update-triage-ax.dto';
import { TriageAxRepo } from './triage-ax.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class TriageAxService {
  constructor(private triageAxRepo: TriageAxRepo) {}

  async create(createTriageAxDto: CreateTriageAxDto, creatorId: string) {
    try {
      const triageAx = await this.triageAxRepo.addTriageAx(createTriageAxDto, creatorId);
      return triageAx;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const triageAx = await this.triageAxRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.triageAxRepo.includeObj});
      return triageAx;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const triageAx = await this.triageAxRepo.getByID(id);
      return triageAx;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTriageAxDto: UpdateTriageAxDto) {
    try {
      const triageAx = await this.triageAxRepo.update(id,updateTriageAxDto);
      return triageAx;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const triageAx = await this.triageAxRepo.delete(id);
      return triageAx;
    } catch (error) {
      throw error;
    }
  }
}
