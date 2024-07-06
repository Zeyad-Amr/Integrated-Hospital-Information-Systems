import { Module } from '@nestjs/common';
import { ConsultationRequestService } from './consultation-request.service';
import { ConsultationRequestController } from './consultation-request.controller';
import { ConsultationRequestRepo } from './consultation-request.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [ConsultationRequestController],
  providers: [
    ConsultationRequestService,
    ConsultationRequestRepo,
    PrismaService,
  ],
})
export class ConsultationRequestModule {}
