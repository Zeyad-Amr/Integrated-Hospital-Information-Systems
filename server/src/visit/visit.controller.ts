import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { VisitService } from './visit.service';
import { AnonymousVisitDto, CreateVisitDto } from './dto/create-visit.dto';

import { UpdateVisitDto } from './dto/update-visit.dto';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { handleError } from 'src/shared/http-error';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { Visit } from '@prisma/client';
import { Filter, FilteringParams } from 'src/shared/decorators/filters.decorator';
import { SortingParams, Sorting } from 'src/shared/decorators/order.decorator';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

@ApiBearerAuth()
@ApiTags('visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) { }

  @ApiOperation({ description: "This to add normal visit for know patient data" })
  @ApiCreatedResponse({ description: "visit has been created successfully" })
  @ApiBadRequestResponse({ description: "body has missed some data" })
  @Post()
  create(@Body() createVisitDto: CreateVisitDto, @Req() req) {
    try {
      return this.visitService.create(createVisitDto, req.user.sub)
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: "This is for anonymous patient" })
  @ApiCreatedResponse({ description: "visit has been created successfully" })
  @ApiBadRequestResponse({ description: "body has missed some data" })
  @Post('anonymous')
  createAnonymous(@Body() anonymousVisitDto: AnonymousVisitDto, @Req() req) {
    try {
      return this.visitService.createAnonymous(anonymousVisitDto, req.user.sub);
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: "this for visits with filters (not finished yet)" })
  @CustomGetAllParamDecorator()
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams(['code', 'createdAt', 'creatorId', 'companionId', 'patientId', 'sequenceNumber']) filters?: Array<Filter>,
    @SortingParams(['createdAt', 'sequenceNumber', 'code']) sort?: Sorting
  ): Promise<PaginatedResource<Visit>> {
    try {
      return this.visitService.findAll(paginationParams, filters, sort);
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: "This is to get visit data with visit code" })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @Get(':visitcode')
  findOne(@Param('visit-code') visitCode: string) {
    try {
      return this.visitService.findOne(visitCode);
    } catch (error) {
      throw handleError(error)
    }
  }
}


