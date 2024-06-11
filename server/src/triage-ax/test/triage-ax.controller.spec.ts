import { Test, TestingModule } from '@nestjs/testing';
import { TriageAxController } from '../triage-ax.controller';
import { TriageAxService } from '../triage-ax.service';

describe('TriageAxController', () => {
  let controller: TriageAxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriageAxController],
      providers: [TriageAxService],
    }).compile();

    controller = module.get<TriageAxController>(TriageAxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
