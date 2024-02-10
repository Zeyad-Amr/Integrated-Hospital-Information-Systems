import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { SpecializationRepo } from './specialization.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [SpecializationController],
  providers: [SpecializationService, SpecializationRepo, PrismaService],
})
export class SpecializationModule { }
