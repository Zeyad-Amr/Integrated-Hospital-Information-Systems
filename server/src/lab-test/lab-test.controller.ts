import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { handleError } from 'src/shared/http-error';
import {
  Pagination,
  PaginationParams,
} from 'src/shared/decorators/pagination.decorator';
import {
  Filter,
  FilteringParams,
} from 'src/shared/decorators/filters.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

@ApiTags('lab-test')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('lab-test')
export class LabTestController {
  constructor(private readonly vitalsService: LabTestService) {}

  @Post()
  @ApiOperation({ summary: 'Create labTest' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createLabTestDto: CreateLabTestDto, @Req() req) {
    try {
      const creatorId = req.user.sub;
      return await this.vitalsService.create(createLabTestDto, creatorId);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all surgeries' })
  @ApiOkResponse({ description: 'get all surgeries' })
  @CustomGetAllParamDecorator()
  async findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams([]) filters?: Array<Filter>,
    @SortingParams([]) sort?: Sorting,
  ) {
    try {
      return await this.vitalsService.findAll(paginationParams, filters, sort);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get labTest by id' })
  @ApiOkResponse({ description: 'get a labTest' })
  @ApiNotFoundResponse({ description: 'labTest not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update labTest' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'labTest not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLabTestDto: UpdateLabTestDto,
  ) {
    try {
      return await this.vitalsService.update(id, updateLabTestDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete labTest by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'labTest not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
