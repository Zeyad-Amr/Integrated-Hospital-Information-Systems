import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisRepo } from './diagnosis.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [DiagnosisController],
  providers: [DiagnosisService,DiagnosisRepo,PrismaService],
})
export class DiagnosisModule {}
