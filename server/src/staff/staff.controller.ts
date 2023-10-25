import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { handleError } from '../shared/http-error';

@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  // @Post()
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Create staff member' })
  // @ApiCreatedResponse({ description: 'created successfully' })
  // @ApiBadRequestResponse({ description: 'Bad Request' })
  // @ApiConflictResponse({ description: 'staff member already exist' })
  // async create(@Body() createStaffDto: CreateStaffDto) {
  //   try {
  //     return await this.staffService.create(createStaffDto);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  // @Get()
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'get staff members' })
  // @ApiOkResponse({ description: 'get a staff members' })
  // async findAll() {
  //   try {
  //     return await this.staffService.findAll();
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  // @Get(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'get staff member by id' })
  // @ApiOkResponse({ description: 'get a staff member' })
  // @ApiNotFoundResponse({ description: 'staff member not found' })
  // async findOne(@Param('id') id: string) {
  //   try {
  //     return await this.staffService.findOne(id);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  // @Patch(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'update staff member' })
  // @ApiOkResponse({ description: 'updated successfully' })
  // @ApiNotFoundResponse({ description: 'staff member not found' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateStaffDto: UpdateStaffDto,
  // ) {
  //   try {
  //     return await this.staffService.update(id, updateStaffDto);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }

  // @Delete(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'delete staff member by id' })
  // @ApiOkResponse({ description: 'deleted successfully' })
  // @ApiNotFoundResponse({ description: 'staff member not found' })
  // async delete(@Param('id') id: string) {
  //   try {
  //     return await this.staffService.delete(id);
  //   } catch (error) {
  //     throw handleError(error);
  //   }
  // }
}
