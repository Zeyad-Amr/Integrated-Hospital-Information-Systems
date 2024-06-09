import { Test, TestingModule } from '@nestjs/testing';
import { MedicalProblemService } from '../medical-problem.service';

describe('MedicalProblemService', () => {
  let service: MedicalProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalProblemService],
    }).compile();

    service = module.get<MedicalProblemService>(MedicalProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
