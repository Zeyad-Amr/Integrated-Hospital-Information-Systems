import { BadRequestException, Injectable } from '@nestjs/common';
import { AnonymousVisitDto, CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitRepo } from './visit.repo';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Prisma, Visit } from '@prisma/client';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class VisitService {
  constructor(private readonly visitRepo: VisitRepo) { }
  async create(createVisitDto: CreateVisitDto, creatorId: string) {
    try {

      if (createVisitDto.companion && createVisitDto.companion.SSN === createVisitDto.patient.SSN)
        throw new BadRequestException("companion ssn is equal to patient ssn")
        if (createVisitDto.companion && createVisitDto.companion.email === createVisitDto.patient.email)
        throw new BadRequestException("companion email is equal to patient email")
        if (createVisitDto.companion && createVisitDto.companion.phone === createVisitDto.patient.phone)
        throw new BadRequestException("companion phone is equal to patient phone")
      return await this.visitRepo.createPatientWithVisit(createVisitDto, creatorId)

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

  findAll(paginationParams: Pagination, filters?: Array<Filter>, sort?: Sorting): Promise<PaginatedResource<Visit>> {
    try {
      const includeObj = { companion: true, creator:{include:{person:true}}, incident: true, patient: true }

      return this.visitRepo.getAll({ paginationParams, filters, sort, include: includeObj })

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
