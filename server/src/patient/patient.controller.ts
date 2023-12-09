import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { handleError } from 'src/shared/http-error';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';
import {
  Pagination,
  PaginationParams,
} from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import {
  Filter,
  FilteringParams,
} from 'src/shared/decorators/filters.decorator';

@ApiBearerAuth()
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ description: 'get all patients' })
  @ApiOkResponse()
  @CustomGetAllParamDecorator()
  @Get()
  findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['firstName', 'createdAt']) sort?: Sorting,
    @FilteringParams([
      'firstName',
      'secondName',
      'thirdName',
      'fourthName',
      'gender',
      'phone',
      'governate',
      'createdAt',
    ])
    filters?: Array<Filter>,
  ) {
    try {
      return this.patientService.findAll(pagination, sort, filters);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({ description: 'get patient with SSN with their visits' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    try {
      return this.patientService.findOne(ssn);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({ description: 'visit data completion' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Patch()
  update(@Body() updatePatientDto: UpdatePatientDto) {
    try {
      return this.patientService.update(updatePatientDto);
    } catch (error) {
      throw handleError(error);
    }
  }
}
