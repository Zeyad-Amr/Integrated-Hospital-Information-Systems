import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnumsService } from './enums.service';
import { CreateEnumDto } from './dto/create-enum.dto';
import { UpdateEnumDto } from './dto/update-enum.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
@ApiTags('enums')
@ApiBearerAuth()
@Controller('enums')
export class EnumsController {
  constructor(private readonly enumsService: EnumsService) { }


  @Get()
  @ApiOperation({ summary: 'get all enums' })
  @ApiOkResponse({ description: 'get all enums' })
  findAll() {
    return this.enumsService.findAll();
  }

}
