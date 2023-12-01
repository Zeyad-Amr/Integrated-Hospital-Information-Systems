import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { IncidentRepo } from './incident.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class IncidentService {
  constructor(private readonly incidentRepo: IncidentRepo) {}
  create(createIncidentDto: CreateIncidentDto, creatorId: string) {
    try {
      return this.incidentRepo.createIncident(createIncidentDto, creatorId);
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters: Array<Filter>,
    sort: Sorting,
  ) {
    try {
      return this.incidentRepo.findAll(paginationParams, filters, sort);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.incidentRepo.getById(id);
    } catch (error) {
      throw error;
    }
  }
}
