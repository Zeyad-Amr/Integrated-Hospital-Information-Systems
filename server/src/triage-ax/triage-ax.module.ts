import { Module } from '@nestjs/common';
import { TriageAxService } from './triage-ax.service';
import { TriageAxController } from './triage-ax.controller';

@Module({
  controllers: [TriageAxController],
  providers: [TriageAxService],
})
export class TriageAxModule {}
