import { Module } from '@nestjs/common';
import { SurgeryService } from './surgery.service';
import { SurgeryController } from './surgery.controller';
import { SurgeryRepo } from './surgery.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [SurgeryController],
  providers: [SurgeryService,SurgeryRepo,PrismaService],
})
export class SurgeryModule {}
