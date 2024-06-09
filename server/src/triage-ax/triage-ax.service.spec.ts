import { Test, TestingModule } from '@nestjs/testing';
import { TriageAxService } from './triage-ax.service';

describe('TriageAxService', () => {
  let service: TriageAxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriageAxService],
    }).compile();

    service = module.get<TriageAxService>(TriageAxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
