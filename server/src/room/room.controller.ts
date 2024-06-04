import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { Pagination, PaginationParams } from 'src/shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/shared/decorators/order.decorator';
import { Filter, FilteringParams } from 'src/shared/decorators/filters.decorator';
import { CustomGetAllParamDecorator } from 'src/shared/decorators/custom.query.decorator';

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

  @CustomGetAllParamDecorator()
  @Get()
  findAll(
    @PaginationParams() pagination: Pagination,
    @SortingParams(["name"]) sort?: Sorting,
    @FilteringParams([
      "name",
      "id",
    ])
    filters?: Array<Filter>,
  ) {
    try {
      return this.roomService.findAll(
        pagination,
        sort,
        filters,
      );
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
