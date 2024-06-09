import { Test, TestingModule } from '@nestjs/testing';
import { MedicalProblemController } from '../medical-problem.controller';
import { MedicalProblemService } from '../medical-problem.service';

describe('MedicalProblemController', () => {
  let controller: MedicalProblemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalProblemController],
      providers: [MedicalProblemService],
    }).compile();

    controller = module.get<MedicalProblemController>(MedicalProblemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
