import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepo } from './room.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepo, PrismaService],
})
export class RoomModule { }
