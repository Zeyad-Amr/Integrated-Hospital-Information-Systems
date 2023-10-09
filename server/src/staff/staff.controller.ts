import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Prisma } from '@prisma/client';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  async create(@Body() createStaffDto: CreateStaffDto) {
    return await this.staffService.create(createStaffDto);

  }

  @Get()
  async findAll() {
    return await this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.staffService.findOne(id);
    } catch (error) {
      throw new NotFoundException()
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    try {
      return await this.staffService.update(id, updateStaffDto);
    } catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(id);
    return await this.staffService.remove(id);

  }
}
