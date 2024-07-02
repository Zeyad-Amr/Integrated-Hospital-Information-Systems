import { Module } from '@nestjs/common';
import { ScanerService } from './scan.service';
import { ScanerController } from './scan.controller';

@Module({
  controllers: [ScanerController],
  providers: [ScanerService],
})
export class ScanModule {}
