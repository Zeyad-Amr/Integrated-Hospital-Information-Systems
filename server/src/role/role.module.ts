import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { RoleRepo } from './role.repo';

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, RoleRepo],
})
export class RoleModule { }
