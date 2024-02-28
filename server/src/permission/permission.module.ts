import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { PermissionRepo } from './permission.repo';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService, PermissionRepo],
})
export class PermissionModule { }
