import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { VisitService } from 'src/visit/visit.service';

@Module({
  controllers: [StreamingController],
  providers: [StreamingService, PrismaService, VisitService],
})
export class StreamingModule { }
