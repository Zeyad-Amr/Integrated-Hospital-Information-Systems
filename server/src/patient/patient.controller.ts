import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {

    try {
      return this.patientService.create(createPatientDto);
    } catch (error) {
      throw handleError(error)
    }
  }

  @Get()
  findAll() {
    try {
      return this.patientService.findAll();
    } catch (error) {
      throw handleError(error)
    }
  }

  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    try {
      return this.patientService.findOne(ssn);
    } catch (error) {
      throw handleError(error)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
