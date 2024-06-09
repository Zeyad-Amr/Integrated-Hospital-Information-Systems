import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TriageAxService } from './triage-ax.service';
import { CreateTriageAxDto } from './dto/create-triage-ax.dto';
import { UpdateTriageAxDto } from './dto/update-triage-ax.dto';

@Controller('triage-ax')
export class TriageAxController {
  constructor(private readonly triageAxService: TriageAxService) {}

  @Post()
  create(@Body() createTriageAxDto: CreateTriageAxDto) {
    return this.triageAxService.create(createTriageAxDto);
  }

  @Get()
  findAll() {
    return this.triageAxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.triageAxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTriageAxDto: UpdateTriageAxDto) {
    return this.triageAxService.update(+id, updateTriageAxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triageAxService.remove(+id);
  }
}
