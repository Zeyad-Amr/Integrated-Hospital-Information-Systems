import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { LabTestController } from './lab-test.controller';

@Module({
  controllers: [LabTestController],
  providers: [LabTestService],
})
export class LabTestModule {}
