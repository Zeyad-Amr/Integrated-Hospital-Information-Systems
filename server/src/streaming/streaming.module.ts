import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { VisitModule } from 'src/visit/visit.module';
import { VisitService } from 'src/visit/visit.service';

@Module({
  imports: [VisitModule],
  controllers: [StreamingController],
  providers: [StreamingService, PrismaService],
})
export class StreamingModule { }
