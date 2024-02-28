import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepo } from './room.repo';

@Injectable()
export class RoomService {
  constructor(private roomRepo: RoomRepo) { }
  create(createRoomDto: CreateRoomDto) {
    try {
      return this.roomRepo.create(createRoomDto);
    } catch (error) {
      throw error;
    }


  }

  findAll() {
    try {
      return this.roomRepo.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.roomRepo.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    try {
      return this.roomRepo.update(+id, updateRoomDto);
    } catch (error) {

    }
  }

  remove(id: string) {
    try {
      return this.roomRepo.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
