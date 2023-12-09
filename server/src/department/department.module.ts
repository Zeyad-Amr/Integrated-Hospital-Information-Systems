import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { DepartmentRepo } from './department.repo';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentRepo, PrismaService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
