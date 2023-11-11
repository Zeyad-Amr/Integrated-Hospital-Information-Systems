import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitService } from './visit.service';
import { AnonymousVisitDto, CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { handleError } from 'src/shared/http-error';

@ApiBearerAuth()
@ApiTags('visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) { }

  @ApiOperation({ description: "This to add normal visit for know patient data" })
  @ApiCreatedResponse({ description: "visit has been created successfully" })
  @ApiBadRequestResponse({ description: "body has missed some data" })
  @Post()
  create(@Body() createVisitDto: CreateVisitDto) {
    try {
      return this.visitService.create(createVisitDto)
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: "This is for anonymous patient" })
  @ApiCreatedResponse({ description: "visit has been created successfully" })
  @ApiBadRequestResponse({ description: "body has missed some data" })
  @Post('anonymous')
  createAnonymous(@Body() anonymousVisitDto: AnonymousVisitDto) {
    try {
      return this.visitService.createAnonymous(anonymousVisitDto);
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: "this for visits with filters (not finished yet)" })
  @Get()
  findAll() {
    try {
      return this.visitService.findAll();
    } catch (error) {
      throw handleError(error)

    }
  }

  @ApiOperation({ description: "This is to get visit data with visit code" })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @Get(':visitcode')
  findOne(@Param('visit-code') visitCode: string) {
    try {
      return this.visitService.findOne(visitCode);
    } catch (error) {
      throw handleError(error)
    }
  }
}


