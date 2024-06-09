import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalsController } from './vitals.controller';
import { VitalsRepo } from './vitals.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [VitalsController],
  providers: [VitalsService,VitalsRepo,PrismaService],
})
export class VitalsModule {}
