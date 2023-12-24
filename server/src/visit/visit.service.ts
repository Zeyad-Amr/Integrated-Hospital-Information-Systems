import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitRepo } from './visit.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Visit } from '@prisma/client';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { TriageAXDto } from './dto/triage-assessment.dto';

@Injectable()
export class VisitService {
  constructor(private readonly visitRepo: VisitRepo) { }
  async create(createVisitDto: CreateVisitDto, creatorId: string) {
    try {
      if (
        createVisitDto.companion?.SSN &&
        createVisitDto.companion.SSN === createVisitDto.patient.SSN
      )
        throw new BadRequestException('companion ssn is equal to patient ssn');
      if (
        createVisitDto.companion?.phone &&
        createVisitDto.companion.phone === createVisitDto.patient.phone
      )
        throw new BadRequestException(
          'companion phone is equal to patient phone',
        );
      return await this.visitRepo.createPatientWithVisit(
        createVisitDto,
        creatorId,
      );
    } catch (error) {
      throw error;
    }
  }

  findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,
  ): Promise<PaginatedResource<Visit>> {
    try {
      const includeObj = {
        companion: true,
        creator: { include: { person: true } },
        incident: true,
        patient: true,
      };

      return this.visitRepo.getAll({
        paginationParams,
        filters,
        sort,
        include: includeObj,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(visitCode: string) {
    try {
      return await this.visitRepo.findByVisitCode(visitCode);
    } catch (error) {
      throw error
    }
  }

  async findERAreaVisits() {
    try {
      const now = new Date();
      const yesterday = new Date(now.getTime());
      yesterday.setDate(now.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      return await this.visitRepo.getAll({
        additionalWhereConditions: [
          {
            transfers: {
              none: {}
            },
          },
          {
            createdAt: {
              gte: yesterday,
              lte: now
            }
          }
        ],
        include: { patient: { include: { person: true } }, transfers: true },
        sort: { direction: 'desc', property: 'createdAt' }

      });
    } catch (error) {
      throw error
    }
  }

  async addTriageAX(code: string, data: TriageAXDto) {
    try {
      return await this.visitRepo.addTriageAss(code, data)
    } catch (error) {
      throw error
    }
  }
}
