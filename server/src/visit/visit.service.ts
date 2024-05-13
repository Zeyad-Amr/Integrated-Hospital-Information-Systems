import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitRepo } from './visit.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Visit } from '@prisma/client';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { TriageAXDto } from './dto/triage-assessment.dto';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';



export interface VisitCustomFilters {
  companionName: string;

  companionSSN: string;
}

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

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,
    customFilters?: VisitCustomFilters
  ): Promise<PaginatedResource<Visit>> {
    try {
      let additionalWhereConditions = getCustomFilters(customFilters);
      return await this.visitRepo.getAll({
        paginationParams,
        filters,
        sort,
        include: this.visitRepo.visitIncludes,
        additionalWhereConditions: additionalWhereConditions
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
      // console.log("5555")


      return await this.visitRepo.findAll();
    } catch (error) {
      throw error
    }
  }

  async addTriageAX(code: string, data: TriageAXDto) {
    try {
      console.log(data);

      return await this.visitRepo.addTriageAss(code, data)
    } catch (error) {
      throw error
    }
  }
}

function getCustomFilters(customFilters: VisitCustomFilters) {
  if (!customFilters) return [];
  let whereConditions = [];
  if (customFilters?.companionName) {
    whereConditions.push({
      companion: {
        person: {
          fullName: { contains: customFilters.companionName, mode: 'insensitive' }
        }
      }
    })
  }
  if (customFilters?.companionSSN) {
    whereConditions.push({
      companion: {
        person: {
          SSN: {contains: customFilters.companionSSN}
        }
      }
    })
  }
  return whereConditions;
}