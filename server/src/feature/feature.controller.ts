import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('Feature')
@Public()
@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) { }

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    try {
      return this.featureService.create(createFeatureDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.featureService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.featureService.findOne(+id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    try {
      return this.featureService.update(+id, updateFeatureDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.featureService.remove(+id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
