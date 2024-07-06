import { Controller, Query, Sse } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Observable, defer, map, repeat } from 'rxjs';
import {
  Pagination,
  PaginationParams,
} from 'src/shared/decorators/pagination.decorator';
import {
  Filter,
  FilteringParams,
} from 'src/shared/decorators/filters.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import { VisitService } from 'src/visit/visit.service';
interface MessageEvent {
  data: string | object;
}
@Controller('streaming')
export class StreamingController {
  constructor(
    private readonly streamingService: StreamingService,
    private visitService: VisitService,
  ) {}

  @Sse('event') // server sent emitter
  async sendEvent(
    @Query() query: { consultationSubdepartmentId?: string },
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams([
      'code',
      'createdAt',
      'creatorId',
      'sequenceNumber',
      'companionId',
      'patientId',
      'incidentId',
      'patient.person.SSN',
      'companion.person.SSN',
      'companion.person.fullName',
      'status',
    ])
    filters?: Array<Filter>,
    @SortingParams([
      'code',
      'createdAt',
      'creatorId',
      'sequenceNumber',
      'companionId',
      'patientId',
      'incidentId',
      'patient.person.SSN',
      'companion.person.SSN',
      'companion.person.fullName',
      'status',
    ])
    sort?: Sorting,
  ): Promise<Observable<MessageEvent>> {
    return defer(() =>
      this.visitService.findAll(paginationParams, filters, sort),
    ).pipe(
      repeat({
        delay: 1000,
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }

  @Sse('examination/visits')
  async findExaminationVisits(
    @Query() query: { subdepartmentId?: string },
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams([
      'code',
      'createdAt',
      'creatorId',
      'sequenceNumber',
      'companionId',
      'patientId',
      'incidentId',
      'patient.person.SSN',
      'companion.person.SSN',
      'companion.person.fullName',
      'status',
    ])
    filters?: Array<Filter>,
    @SortingParams([
      'code',
      'createdAt',
      'creatorId',
      'sequenceNumber',
      'companionId',
      'patientId',
      'incidentId',
      'patient.person.SSN',
      'companion.person.SSN',
      'companion.person.fullName',
      'status',
    ])
    sort?: Sorting,
  ): Promise<Observable<MessageEvent>> {
    return defer(() =>
      this.visitService.findExaminationVisits(
        query.subdepartmentId,
        paginationParams,
        filters,
        sort,
      ),
    ).pipe(
      repeat({
        delay: 1000,
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}
