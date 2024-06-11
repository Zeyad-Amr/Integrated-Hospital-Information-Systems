import { Module } from '@nestjs/common';
import { RadiologyImageService } from './radiology-image.service';
import { RadiologyImageController } from './radiology-image.controller';
import { RadiologyImageRepo } from './radiology-image.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [RadiologyImageController],
  providers: [RadiologyImageService,RadiologyImageRepo,PrismaService],
})
export class RadiologyImageModule {}
