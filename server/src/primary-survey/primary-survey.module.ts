import { Module } from '@nestjs/common';
import { PrimarySurveyService } from './primary-survey.service';
import { PrimarySurveyController } from './primary-survey.controller';

@Module({
  controllers: [PrimarySurveyController],
  providers: [PrimarySurveyService],
})
export class PrimarySurveyModule {}
