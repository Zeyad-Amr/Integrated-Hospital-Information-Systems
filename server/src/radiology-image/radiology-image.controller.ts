import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RadiologyImageService } from './radiology-image.service';
import { CreateRadiologyImageDto } from './dto/create-radiology-image.dto';
import { UpdateRadiologyImageDto } from './dto/update-radiology-image.dto';

@Controller('radiology-image')
export class RadiologyImageController {
  constructor(private readonly radiologyImageService: RadiologyImageService) {}

  @Post()
  create(@Body() createRadiologyImageDto: CreateRadiologyImageDto) {
    return this.radiologyImageService.create(createRadiologyImageDto);
  }

  @Get()
  findAll() {
    return this.radiologyImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radiologyImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRadiologyImageDto: UpdateRadiologyImageDto) {
    return this.radiologyImageService.update(+id, updateRadiologyImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radiologyImageService.remove(+id);
  }
}
