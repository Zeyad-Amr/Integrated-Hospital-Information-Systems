import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { LabTestController } from './lab-test.controller';
import { LabTestRepo } from './lab-test.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [LabTestController],
  providers: [LabTestService,LabTestRepo,PrismaService],
})
export class LabTestModule {}
