import { Module } from '@nestjs/common';
import { RadiologyImageService } from './radiology-image.service';
import { RadiologyImageController } from './radiology-image.controller';

@Module({
  controllers: [RadiologyImageController],
  providers: [RadiologyImageService],
})
export class RadiologyImageModule {}
