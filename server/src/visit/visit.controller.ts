import { Controller, Get, Post, Body, Param, Req, Patch, Query } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto, CustomFilters } from './dto/create-visit.dto';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { handleError } from 'src/shared/http-error';
import {
  Pagination,
  PaginationParams,
} from 'src/shared/decorators/pagination.decorator';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Visit } from '@prisma/client';
import {
  Filter,
  FilteringParams,
} from 'src/shared/decorators/filters.decorator';
import { SortingParams, Sorting } from 'src/shared/decorators/order.decorator';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';
import { TriageAXDto } from './dto/triage-assessment.dto';
import { Public } from 'src/shared/decorators/public.decorator';

// @ApiBearerAuth()
@ApiTags('visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) { }

  @ApiOperation({
    description: 'This to add normal visit for know patient data',
  })
  @ApiCreatedResponse({ description: 'visit has been created successfully' })
  @ApiBadRequestResponse({ description: 'body has missed some data' })
  @Post()
  async create(@Body() createVisitDto: CreateVisitDto, @Req() req) {
    try {
      return await this.visitService.create(createVisitDto, req.user.sub);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({
    description: 'This to add triage assessment to the visit with given code',
  })
  @ApiCreatedResponse({ description: 'triage assessment has been created successfully' })
  @ApiBadRequestResponse({ description: 'body has missed some data' })
  @Patch('triage/:visitCode')
  async addTriageAX(@Body() triageAXDto: TriageAXDto, @Param('visitCode') visitCode: string) {
    try {
      return await this.visitService.addTriageAX(visitCode, triageAXDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({
    description: 'this for visits with filters (not finished yet)',
  })
  @CustomGetAllParamDecorator()
  @Get()
  async findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams([
      'code',
      'createdAt',
      'creatorId',
      "sequenceNumber",
      'companionId',
      'patientId',
      'incidentId',
    ]) filters?: Array<Filter>,
    @SortingParams(['createdAt', 'sequenceNumber', 'code']) sort?: Sorting,
    @Query() customFilters?: CustomFilters,

  ): Promise<PaginatedResource<Visit>> {
    try {
      console.log('customFilters', customFilters);
      return await this.visitService.findAll(paginationParams, filters, sort, customFilters);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({ description: 'This is to get visit data with visit code' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @Get(':visitCode')
  async findOne(@Param('visitCode') visitCode: string) {
    try {
      return await this.visitService.findOne(visitCode);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({ description: 'This is to get all visit data in the ER area' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @Get('all/er-area')
  async findERAreaVisits() {
    try {
      return await this.visitService.findERAreaVisits();
    } catch (error) {
      throw handleError(error);
    }
  }
}
