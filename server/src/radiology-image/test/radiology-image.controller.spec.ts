import { Test, TestingModule } from '@nestjs/testing';
import { RadiologyImageController } from '../radiology-image.controller';
import { RadiologyImageService } from '../radiology-image.service';

describe('RadiologyImageController', () => {
  let controller: RadiologyImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiologyImageController],
      providers: [RadiologyImageService],
    }).compile();

    controller = module.get<RadiologyImageController>(RadiologyImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
