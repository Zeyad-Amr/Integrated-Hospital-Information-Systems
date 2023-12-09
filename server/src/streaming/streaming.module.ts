import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { VisitModule } from 'src/visit/visit.module';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports: [VisitModule, DepartmentModule],
  controllers: [StreamingController],
  providers: [StreamingService, PrismaService],
})
export class StreamingModule {}
