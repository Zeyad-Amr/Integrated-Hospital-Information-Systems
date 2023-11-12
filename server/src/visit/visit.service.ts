import { BadRequestException, Injectable } from '@nestjs/common';
import { AnonymousVisitDto, CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitRepo } from './visit.repo';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Visit } from '@prisma/client';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class VisitService {
  constructor(private readonly visitRepo: VisitRepo) { }
  async create(createVisitDto: CreateVisitDto) {
    try {

      if (createVisitDto.companion && createVisitDto.companion.SSN === createVisitDto.patient.SSN)
        throw new BadRequestException("companion ssn is equal to patient ssn")
      return await this.visitRepo.createPatientWithVisit(createVisitDto)

    } catch (error) {
      throw error
    }
  }

  async createAnonymous(anonymousVisitDto: AnonymousVisitDto, creatorId: string) {
    try {
      return await this.visitRepo.createAnonymous(anonymousVisitDto, creatorId)
    } catch (error) {
      throw error
    }
  }

  // filters
  findAll(paginationParams: Pagination, filters?: Array<Filter>,sort?:Sorting): Promise<PaginatedResource<Visit>> {
    try {
      return this.visitRepo.findAll(paginationParams,filters,sort)

    } catch (error) {
      throw error
    }
  }


  findOne(visitCode: string) {
    try {
      return this.visitRepo.findByVisitCode(visitCode)
    } catch (error) {

    }
  }

}
