import { Injectable } from '@nestjs/common';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { ConsultationRequestRepo } from './consultation-request.repo';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';

@Injectable()
export class ConsultationRequestService {
  constructor(private consultationRequestRepo: ConsultationRequestRepo) {}

  async create(
    createConsultationRequestDto: CreateConsultationRequestDto,
    creatorId: string,
  ) {
    try {
      const consultationRequest =
        await this.consultationRequestRepo.addConsultationRequest(
          createConsultationRequestDto,
          creatorId,
        );
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    paginationParams: Pagination,
    filters?: Array<Filter>,
    sort?: Sorting,
  ) {
    try {
      const consultationRequest = await this.consultationRequestRepo.getAll({
        paginationParams,
        filters,
        sort,
        include: this.consultationRequestRepo.includeObj,
      });
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const consultationRequest =
        await this.consultationRequestRepo.getByID(id);
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateConsultationRequestDto: UpdateConsultationRequestDto,
    consultantId: string,
  ) {
    try {
      const consultationRequest =
        await this.consultationRequestRepo.updateConsultationRequest(
          id,
          updateConsultationRequestDto,
          consultantId,
        );
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const consultationRequest = await this.consultationRequestRepo.delete(id);
      return consultationRequest;
    } catch (error) {
      throw error;
    }
  }
}
