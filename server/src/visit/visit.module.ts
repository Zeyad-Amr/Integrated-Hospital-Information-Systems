import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { VisitRepo } from './visit.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { PersonRepo } from 'src/person/person.repo';

@Module({
  controllers: [VisitController],
  providers: [VisitRepo, VisitService, PrismaService, PersonRepo],
})
export class VisitModule {}
