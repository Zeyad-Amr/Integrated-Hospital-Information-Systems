import { Test, TestingModule } from '@nestjs/testing';
import { PrimarySurveyService } from '../primary-survey.service';

describe('PrimarySurveyService', () => {
  let service: PrimarySurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimarySurveyService],
    }).compile();

    service = module.get<PrimarySurveyService>(PrimarySurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
