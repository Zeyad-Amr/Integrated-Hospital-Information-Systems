import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { handleError } from 'src/shared/http-error';

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

  @Get()
  findAll() {
    try {
      return this.specializationService.findAll();
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
