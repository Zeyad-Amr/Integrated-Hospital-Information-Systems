import { Controller, Get, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { handleError } from 'src/shared/http-error';
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
@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }


  @ApiOperation({ description: 'get all persons data' })
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
      return this.personService.findAll(pagination, sort, filters);
    } catch (error) {
      throw handleError(error);
    }
  }

  @ApiOperation({ description: 'get person data by ssn' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    try {
      return this.personService.findOne(ssn);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.personService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
