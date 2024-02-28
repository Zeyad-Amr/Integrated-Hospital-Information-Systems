import { Module } from '@nestjs/common';
import { SubdepartmentService } from './subdepartment.service';
import { SubdepartmentController } from './subdepartment.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { SubDepartmentRepo } from './subdepartment.repo';
import { RoomRepo } from 'src/room/room.repo';
import { SpecializationRepo } from 'src/specialization/specialization.repo';

@Module({
  controllers: [SubdepartmentController],
  providers: [SubdepartmentService, PrismaService, SubDepartmentRepo, RoomRepo, SpecializationRepo],
})
export class SubdepartmentModule { }
