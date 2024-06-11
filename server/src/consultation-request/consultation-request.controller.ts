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
import { ConsultationRequestService } from './consultation-request.service';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
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

@ApiTags('consultationRequest')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('consultationRequest')
export class ConsultationRequestController {
  constructor(private readonly vitalsService: ConsultationRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create consultationRequest' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createConsultationRequestDto: CreateConsultationRequestDto, @Req() req) {
    try {
      const creatorId = req.user.sub;
      return await this.vitalsService.create(createConsultationRequestDto, creatorId);
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
  @ApiOperation({ summary: 'get consultationRequest by id' })
  @ApiOkResponse({ description: 'get a consultationRequest' })
  @ApiNotFoundResponse({ description: 'consultationRequest not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update consultationRequest' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'consultationRequest not found' })
  async update(
    @Param('id') id: string,
    @Body() updateConsultationRequestDto: UpdateConsultationRequestDto,
  ) {
    try {
      return await this.vitalsService.update(id, updateConsultationRequestDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete consultationRequest by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'consultationRequest not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
