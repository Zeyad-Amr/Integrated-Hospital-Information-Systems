import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubdepartmentService } from './subdepartment.service';
import { AssignFeatures, CreateSubdepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubdepartmentDto } from './dto/update-subdepartment.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import { Filter, FilteringParams } from 'src/shared/decorators/filters.decorator';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

@ApiTags('Subdepartment')
@Public()
@Controller('subdepartment')
export class SubdepartmentController {
  constructor(private readonly subdepartmentService: SubdepartmentService) { }

  @Post()
  create(@Body() createSubdepartmentDto: CreateSubdepartmentDto) {
    try {
      return this.subdepartmentService.create(createSubdepartmentDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @CustomGetAllParamDecorator()
  @Get()
  findAll(@PaginationParams() pagination: Pagination,
    @SortingParams([
      'name',
      "roomId",
      "specializationId",
      "departmentId",
    ]) sort?: Sorting,
    @FilteringParams([
      "name",
      "roomId",
      "specializationId",
      "departmentId"
    ])
    filters?: Array<Filter>,
  ) {
    try {
      return this.subdepartmentService.findAll(
        pagination,
        sort,
        filters,
      );
    } catch (error) {
      throw handleError(error);
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.subdepartmentService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubdepartmentDto: UpdateSubdepartmentDto) {
    try {
      return this.subdepartmentService.update(id, updateSubdepartmentDto);
    } catch (error) {
      throw handleError(error);
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.subdepartmentService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id/assignfeatures')
  async assignPermissions(@Param('id') id: string, @Body() body: AssignFeatures) {
    try {
      return await this.subdepartmentService.assignFeatures(id, body);
    } catch (error) {
      throw handleError(error);
    }
  }
}
