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
import { SurgeryService } from './surgery.service';
import { CreateSurgeryDto } from './dto/create-surgery.dto';
import { UpdateSurgeryDto } from './dto/update-surgery.dto';
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

@ApiTags('surgery')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('surgery')
export class SurgeryController {
  constructor(private readonly vitalsService: SurgeryService) {}

  @Post()
  @ApiOperation({ summary: 'Create surgery' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createSurgeryDto: CreateSurgeryDto, @Req() req) {
    try {
      const creatorId = req.user.sub;
      return await this.vitalsService.create(createSurgeryDto, creatorId);
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
  @ApiOperation({ summary: 'get surgery by id' })
  @ApiOkResponse({ description: 'get a surgery' })
  @ApiNotFoundResponse({ description: 'surgery not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update surgery' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'surgery not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSurgeryDto: UpdateSurgeryDto,
  ) {
    try {
      return await this.vitalsService.update(id, updateSurgeryDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete surgery by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'surgery not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
