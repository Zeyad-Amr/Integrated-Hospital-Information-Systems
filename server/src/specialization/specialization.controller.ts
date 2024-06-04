import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { handleError } from 'src/shared/http-error';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import { Filter, FilteringParams } from 'src/shared/decorators/filters.decorator';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

@ApiTags('Specialization')
@Public()
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) { }

  @Post()
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    try {
      return this.specializationService.create(createSpecializationDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @CustomGetAllParamDecorator()
  @Get()
  findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(['name']) sort?: Sorting,
    @FilteringParams([
      'id',
      'name',
    ])
    filters?: Array<Filter>,
  ) {
    try {
      return this.specializationService.findAll(
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
      const res = await this.specializationService.findOne(id);

      return res;
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSpecializationDto: UpdateSpecializationDto) {
    try {
      return await this.specializationService.update(id, updateSpecializationDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.specializationService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
