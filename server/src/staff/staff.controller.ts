import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
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
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
