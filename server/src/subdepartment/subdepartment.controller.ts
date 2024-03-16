import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubdepartmentService } from './subdepartment.service';
import { CreateSubdepartmentDto } from './dto/create-subdepartment.dto';
import { UpdateSubdepartmentDto } from './dto/update-subdepartment.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

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

  @Get()
  findAll() {
    try {
      return this.subdepartmentService.findAll();
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
}
