import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { handleError } from 'src/shared/http-error';

@ApiBearerAuth()
@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) { }


  @ApiProperty({ description: 'Transfer patients between departments' })
  @ApiCreatedResponse({ description: 'Transfer has been created successfully' })
  @ApiBadRequestResponse({ description: 'Body has missed some data' })
  @ApiNotFoundResponse({ description: 'visit not found' })
  @Post()
  async create(@Body() createTransferDto: CreateTransferDto, @Req() req) {
    try {
      return await this.transferService.create(createTransferDto, req.user.sub)
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  findAll() {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferDto) {
    return this.transferService.update(+id, updateTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transferService.remove(+id);
  }
}
