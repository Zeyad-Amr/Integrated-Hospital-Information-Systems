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
import { MedicalProblemService } from './medical-problem.service';
import { CreateMedicalProblemDto } from './dto/create-medical-problem.dto';
import { UpdateMedicalProblemDto } from './dto/update-medical-problem.dto';
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

@ApiTags('medicalProblem')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('medicalProblem')
export class MedicalProblemController {
  constructor(private readonly vitalsService: MedicalProblemService) {}

  @Post()
  @ApiOperation({ summary: 'Create medicalProblem' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(
    @Body() createMedicalProblemDto: CreateMedicalProblemDto,
    @Req() req,
  ) {
    try {
      const creatorId = req.user.sub;
      return await this.vitalsService.create(
        createMedicalProblemDto,
        creatorId,
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'get all medicalProblems' })
  @ApiOkResponse({ description: 'get all medicalProblems' })
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
  @ApiOperation({ summary: 'get medicalProblem by id' })
  @ApiOkResponse({ description: 'get a medicalProblem' })
  @ApiNotFoundResponse({ description: 'medicalProblem not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vitalsService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update medicalProblem' })
  @ApiOkResponse({ description: 'updated successfully' })
  @ApiNotFoundResponse({ description: 'medicalProblem not found' })
  async update(
    @Param('id') id: string,
    @Body() updateMedicalProblemDto: UpdateMedicalProblemDto,
  ) {
    try {
      return await this.vitalsService.update(id, updateMedicalProblemDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete medicalProblem by id' })
  @ApiOkResponse({ description: 'deleted successfully' })
  @ApiNotFoundResponse({ description: 'medicalProblem not found' })
  async remove(@Param('id') id: string) {
    try {
      return await this.vitalsService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
