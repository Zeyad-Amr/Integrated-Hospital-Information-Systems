import { Module } from '@nestjs/common';
import { TriageAxService } from './triage-ax.service';
import { TriageAxController } from './triage-ax.controller';
import { TriageAxRepo } from './triage-ax.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [TriageAxController],
  providers: [TriageAxService,TriageAxRepo,PrismaService],
})
export class TriageAxModule {}
