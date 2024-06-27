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
import { PrimarySurveyService } from './primary-survey.service';
import { CreatePrimarySurveyDto } from './dto/create-primary-survey.dto';
import { UpdatePrimarySurveyDto } from './dto/update-primary-survey.dto';
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

@ApiTags('primarySurvey')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('primarySurvey')
export class PrimarySurveyController {
  constructor(private readonly vitalsService: PrimarySurveyService) {}

  @Post()
  @ApiOperation({ summary: 'Create primarySurvey' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Body() createPrimarySurveyDto: CreatePrimarySurveyDto,
    @Req() req,
  ) {
    try {
      const creatorId = req.user.sub;
      return await this.vitalsService.create(createPrimarySurveyDto, creatorId);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all primarySurvey' })
  @ApiOkResponse({ description: 'get all primarySurvey' })
  @CustomGetAllParamDecorator()
  async findAll(
    @PaginationParams() paginationParams: Pagination,
    @FilteringParams(['visitCode']) filters?: Array<Filter>,
    @SortingParams([]) sort?: Sorting,
  ) {
    try {
      return await this.vitalsService.findAll(paginationParams, filters, sort);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get primarySurvey by id' })
  @ApiOkResponse({ description: 'get a primarySurvey' })
  @ApiNotFoundResponse({ description: 'primarySurvey not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update primarySurvey' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'primarySurvey not found' })
  async update(
    @Param('id') id: string,
    @Body() updatePrimarySurveyDto: UpdatePrimarySurveyDto,
  ) {
    try {
      return await this.vitalsService.update(id, updatePrimarySurveyDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete primarySurvey by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'primarySurvey not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
