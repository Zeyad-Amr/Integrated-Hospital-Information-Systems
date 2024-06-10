import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { CustomFilters, EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { handleError } from '../shared/http-error';
import { AuthRequest } from 'src/auth/auth.interface';
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

@ApiTags('employee')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @ApiOperation({ summary: 'Create employee' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'employee already exist' })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Req() req: AuthRequest,
  ) {
    try {
      const userId = req.user.sub;
      return await this.employeeService.create(createEmployeeDto, userId);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all employees' })
  @ApiOkResponse({ description: 'get all employees' })
  @CustomGetAllParamDecorator()
  async findAll(
    @Query() customFilters?: CustomFilters,
    @PaginationParams() pagination?: Pagination,
    @SortingParams([
      'shiftId',
      'roleId',
      'createdAt',
      'updatedAt',
      'person.fullName',
      'person.SSN',
      'person.phone',
    ]) sort?: Sorting,
    @FilteringParams([
      'shiftId',
      'roleId',
      'createdAt',
      'updatedAt',
      'person.fullName',
      'person.SSN',
      'person.phone',
    ]) filters?: Array<Filter>,
  ) {
    try {
      return await this.employeeService.findAll(pagination, sort, filters, customFilters);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get employee by id' })
  @ApiOkResponse({ description: 'get a employee' })
  @ApiNotFoundResponse({ description: 'employee not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.employeeService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update employee' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'employee not found' })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      return await this.employeeService.update(id, updateEmployeeDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete employee by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'employee not found' })
  async delete(@Param('id') id: string) {
    try {
      return await this.employeeService.delete(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
