import { Injectable } from '@nestjs/common';
import { CreatePrimarySurveyDto } from './dto/create-primary-survey.dto';
import { UpdatePrimarySurveyDto } from './dto/update-primary-survey.dto';
import { PrimarySurveyRepo } from './primary-survey.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class PrimarySurveyService {
  constructor(private primarySurveyRepo: PrimarySurveyRepo) {}

  async create(createPrimarySurveyDto: CreatePrimarySurveyDto, creatorId: string) {
    try {
      const primarySurvey = await this.primarySurveyRepo.addPrimarySurvey(createPrimarySurveyDto, creatorId);
      return primarySurvey;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,) {
    try {
      const primarySurvey = await this.primarySurveyRepo.getAll({paginationParams,
        filters,
        sort,
        include: this.primarySurveyRepo.includeObj});
      return primarySurvey;
    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string) {
    try {
      const primarySurvey = await this.primarySurveyRepo.getByID(id);
      return primarySurvey;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatePrimarySurveyDto: UpdatePrimarySurveyDto) {
    try {
      const primarySurvey = await this.primarySurveyRepo.update(id,updatePrimarySurveyDto);
      return primarySurvey;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const primarySurvey = await this.primarySurveyRepo.delete(id);
      return primarySurvey;
    } catch (error) {
      throw error;
    }
  }
}
