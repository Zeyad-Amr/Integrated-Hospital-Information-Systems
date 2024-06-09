import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrimarySurveyService } from './primary-survey.service';
import { CreatePrimarySurveyDto } from './dto/create-primary-survey.dto';
import { UpdatePrimarySurveyDto } from './dto/update-primary-survey.dto';

@Controller('primary-survey')
export class PrimarySurveyController {
  constructor(private readonly primarySurveyService: PrimarySurveyService) {}

  @Post()
  create(@Body() createPrimarySurveyDto: CreatePrimarySurveyDto) {
    return this.primarySurveyService.create(createPrimarySurveyDto);
  }

  @Get()
  findAll() {
    return this.primarySurveyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.primarySurveyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrimarySurveyDto: UpdatePrimarySurveyDto) {
    return this.primarySurveyService.update(+id, updatePrimarySurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.primarySurveyService.remove(+id);
  }
}
