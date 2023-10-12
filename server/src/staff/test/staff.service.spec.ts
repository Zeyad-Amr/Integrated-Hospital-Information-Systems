import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from '../staff.service';
import { StaffRepo } from '../staff.repo';

describe('StaffService', () => {
  let service: StaffService;
  const mockStaffrepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        {
          provide: StaffRepo,
          useValue: mockStaffrepo,
        },
      ],
    }).compile();

    service = module.get<StaffService>(StaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
