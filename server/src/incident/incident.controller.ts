import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { handleError } from 'src/shared/http-error';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('incident')
@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) { }

  @ApiOperation({ description: "create a new incident" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createIncidentDto: CreateIncidentDto,@Req() req) {
    try {
      return this.incidentService.create(createIncidentDto,req.user.sub)
    } catch (error) {
      throw handleError(error)
    }
  }

  @ApiOperation({ description: "get all incidents" })
  @ApiOkResponse()
  @Get()
  findAll() {
    try {
      return this.incidentService.findAll();
    } catch (error) {
      throw handleError(error)
    }
  }


  @ApiOperation({ description: "get all incident data by id" })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try { return this.incidentService.findOne(id); }
    catch (error) {
      throw handleError(error)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
