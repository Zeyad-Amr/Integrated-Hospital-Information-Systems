import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitRepo } from './visit.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Visit, VisitStatus } from '@prisma/client';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { TriageAXDto } from './dto/triage-assessment.dto';
import { MainComplaintDto, UpdateVisitStatus } from './dto/update-visit.dto';

export interface VisitCustomFilters {
  companionName: string;

  companionSSN: string;
}

@Injectable()
export class VisitService {
  constructor(private readonly visitRepo: VisitRepo) {}
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
  ): Promise<PaginatedResource<Visit>> {
    try {
      return await this.visitRepo.getAll({
        paginationParams,
        filters,
        sort,
        include: this.visitRepo.visitIncludes,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(visitCode: string) {
    try {
      return await this.visitRepo.findByVisitCode(visitCode);
    } catch (error) {
      throw error;
    }
  }

  async addComplaint(visitCode: string, mainComplaintDto: MainComplaintDto) {
    try {
      return await this.visitRepo.updateVisit(visitCode, {
        mainComplaint: mainComplaintDto.mainComplaint,
      });
    } catch (error) {
      throw error;
    }
  }

  async addTriageAx(triageAxDto: TriageAXDto, creatorId: string) {
    try {
      return await this.visitRepo.updateVisit(triageAxDto.visitCode, {
        status: VisitStatus.TRANSFERED,
        mainComplaint: triageAxDto.mainComplaint,
        transfers: {
          create: {
            toSubDepId: triageAxDto.toSubDepId,
            transferDate: new Date(),
            createdById: creatorId,
          },
        },
        vitals: {
          create: {
            ...triageAxDto.vitals,
            authorId: creatorId,
            patientId: triageAxDto.patientId,
          },
        },
        triageAx: {
          create: {
            triageId: triageAxDto?.triage?.triageTypeId,
            painScore: triageAxDto?.triage?.painScore,
            consciousnessLevelId: triageAxDto?.triage?.LOCId,
          },
        },
      });
    } catch (error) {
      throw error;
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
              none: {},
            },
          },
          {
            createdAt: {
              gte: yesterday,
              lte: now,
            },
          },
        ],
        include: {
          patient: {
            include: {
              person: { include: { verificationMethod: true, gender: true } },
            },
          },
          transfers: true,
        },
        sort: { direction: 'desc', property: 'createdAt' },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(visitCode: string, updateVisitDto: UpdateVisitStatus) {
    try {
      return await this.visitRepo.updateStatus(
        visitCode,
        updateVisitDto.status,
      );
    } catch (error) {
      throw error;
    }
  }

  async findExaminationVisits(
    subdepartmentId: string,
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,
  ): Promise<PaginatedResource<Visit>> {
    // get all visits where last transfer tosubdepartment is the given subdepartment
    // and if any of the consulationRequests has consultationSubdepartmentId equal to the given subdepartment

    try {
      return await this.visitRepo.getAll({
        paginationParams,
        filters,
        sort,
        include: this.visitRepo.visitIncludes,
        additionalWhereConditions: [
          {
            OR: [
              {
                transfers: {
                  some: {
                    toSubDepId: +subdepartmentId,
                  },
                },
              },
              {
                consultationRequest: {
                  some: {
                    consultationSubdepartmentId: +subdepartmentId,
                  },
                },
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}
