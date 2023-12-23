import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { handleError } from 'src/shared/http-error';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from 'src/shared/decorators/pagination.decorator';
import {
  Filter,
  FilteringParams,
} from 'src/shared/decorators/filters.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

@ApiBearerAuth()
@ApiTags('incident')
@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) { }
  // TODO: Handle Incident with new database schema

  // @ApiOperation({ description: 'create a new incident' })
  // @ApiCreatedResponse()
  // @ApiBadRequestResponse()
  // @Post()
  // create(@Body() createIncidentDto: CreateIncidentDto, @Req() req) {
  //   try {
  //     return this.incidentService.create(createIncidentDto, req.user.sub);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  @ApiOperation({ description: 'get all incidents' })
  @CustomGetAllParamDecorator()
  @ApiOkResponse()
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams(['isCompleted', 'createdAt', 'numberOfPatients'])
    filters?: Array<Filter>,
    @SortingParams(['createdAt', 'sequenceNumber', 'code']) sort?: Sorting,
  ) {
    try {
      return this.incidentService.findAll(paginationParams, filters, sort);
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: 'get all incident data by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.incidentService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
