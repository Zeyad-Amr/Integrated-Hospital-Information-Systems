import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from './../shared/services/data-service/prisma-service/prisma.service';
import { StaffRepo } from './staff.repo';
import { PrismaModule } from './../shared/services/data-service/prisma-service/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StaffController],
  providers: [StaffService, PrismaService, StaffRepo],
})
export class StaffModule { }
