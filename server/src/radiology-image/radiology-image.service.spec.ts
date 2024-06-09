import { Test, TestingModule } from '@nestjs/testing';
import { RadiologyImageService } from './radiology-image.service';

describe('RadiologyImageService', () => {
  let service: RadiologyImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadiologyImageService],
    }).compile();

    service = module.get<RadiologyImageService>(RadiologyImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
