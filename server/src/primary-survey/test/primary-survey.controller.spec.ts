import { Test, TestingModule } from '@nestjs/testing';
import { PrimarySurveyController } from '../primary-survey.controller';
import { PrimarySurveyService } from '../primary-survey.service';

describe('PrimarySurveyController', () => {
  let controller: PrimarySurveyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimarySurveyController],
      providers: [PrimarySurveyService],
    }).compile();

    controller = module.get<PrimarySurveyController>(PrimarySurveyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
