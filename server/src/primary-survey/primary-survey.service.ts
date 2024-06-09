import { Injectable } from '@nestjs/common';
import { CreatePrimarySurveyDto } from './dto/create-primary-survey.dto';
import { UpdatePrimarySurveyDto } from './dto/update-primary-survey.dto';

@Injectable()
export class PrimarySurveyService {
  create(createPrimarySurveyDto: CreatePrimarySurveyDto) {
    return 'This action adds a new primarySurvey';
  }

  findAll() {
    return `This action returns all primarySurvey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} primarySurvey`;
  }

  update(id: number, updatePrimarySurveyDto: UpdatePrimarySurveyDto) {
    return `This action updates a #${id} primarySurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} primarySurvey`;
  }
}
