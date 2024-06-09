import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { MedicationRepo } from './medication.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [MedicationController],
  providers: [MedicationService,MedicationRepo,PrismaService],
})
export class MedicationModule {}
