import { Module } from '@nestjs/common';
import { PrimarySurveyService } from './primary-survey.service';
import { PrimarySurveyController } from './primary-survey.controller';
import { PrimarySurveyRepo } from './primary-survey.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [PrimarySurveyController],
  providers: [PrimarySurveyService,PrimarySurveyRepo,PrismaService],
})
export class PrimarySurveyModule {}
