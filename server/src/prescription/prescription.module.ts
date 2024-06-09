import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionRepo } from './prescription.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [PrescriptionController],
  providers: [PrescriptionService,PrescriptionRepo,PrismaService],
})
export class PrescriptionModule {}
