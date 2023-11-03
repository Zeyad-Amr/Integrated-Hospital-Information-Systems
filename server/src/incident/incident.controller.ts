import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('incident')
@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) { }

  @Post()
  create(@Body() createIncidentDto: CreateIncidentDto) {
    try {
      return this.incidentService.create(createIncidentDto)
    } catch (error) {
      throw handleError(error)
    }
  }

  @Get()
  findAll() {
    return this.incidentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
