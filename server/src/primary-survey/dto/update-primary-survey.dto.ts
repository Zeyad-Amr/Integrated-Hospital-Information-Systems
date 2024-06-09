import { PartialType } from '@nestjs/swagger';
import { CreatePrimarySurveyDto } from './create-primary-survey.dto';

export class UpdatePrimarySurveyDto extends PartialType(CreatePrimarySurveyDto) {}
