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
import { RadiologyImageService } from './radiology-image.service';
import { CreateRadiologyImageDto } from './dto/create-radiology-image.dto';
import { UpdateRadiologyImageDto } from './dto/update-radiology-image.dto';
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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

@ApiTags('radiology-image')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('radiology-image')
export class RadiologyImageController {
  constructor(private readonly vitalsService: RadiologyImageService) {}

  @Post()
  @ApiOperation({ summary: 'Create radiologyImage' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Body() createRadiologyImageDto: CreateRadiologyImageDto,
    @Req() req,
  ) {
    try {
      const creatorId = req.user.sub;
      return await this.vitalsService.create(
        createRadiologyImageDto,
        creatorId,
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get alll radiologyImage' })
  @ApiOkResponse({ description: 'get all radiologyImage' })
  @CustomGetAllParamDecorator()
  async findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams(['patientId', 'visitCode']) filters?: Array<Filter>,
    @SortingParams([]) sort?: Sorting,
  ) {
    try {
      return await this.vitalsService.findAll(paginationParams, filters, sort);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get radiologyImage by id' })
  @ApiOkResponse({ description: 'get a radiologyImage' })
  @ApiNotFoundResponse({ description: 'radiologyImage not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update radiologyImage' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'radiologyImage not found' })
  async update(
    @Param('id') id: string,
    @Body() updateRadiologyImageDto: UpdateRadiologyImageDto,
  ) {
    try {
      return await this.vitalsService.update(id, updateRadiologyImageDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete radiologyImage by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'radiologyImage not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
