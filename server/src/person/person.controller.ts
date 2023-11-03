import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@Public()
@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @ApiOperation({ description: "create a new person or update its data if exists (send the data that you want to be stored)" })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse({ description: "person already exists" })
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @ApiOperation({ description: "get all persons data" })
  @ApiOkResponse()
  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @ApiOperation({ description: "get person data by ssn" })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get(':ssn')
  findOne(@Param('ssn') ssn: string) {
    return this.personService.findOne(ssn);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
