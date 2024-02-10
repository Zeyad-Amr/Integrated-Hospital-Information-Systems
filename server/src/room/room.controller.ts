import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('Room')
@Public()
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    try {
      return this.roomService.create(createRoomDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.roomService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const res = await this.roomService.findOne(id);
      return res;
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    try {
      return this.roomService.update(id, updateRoomDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.roomService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
