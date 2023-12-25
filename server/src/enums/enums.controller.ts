import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnumsService } from './enums.service';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('enums')
export class EnumsController {
  constructor(private readonly enumsService: EnumsService) { }

  @Post()
  create(@Body() createEnumDto: CreateEnumDto) {
    return this.enumsService.create(createEnumDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all enums' })
  @ApiOkResponse({ description: 'get all enums' })
  findAll() {
    return this.enumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enumsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEnumDto: UpdateEnumDto) {
    return this.enumsService.update(+id, updateEnumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.enumsService.remove(+id);
  }
}
