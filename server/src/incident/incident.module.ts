import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { IncidentRepo } from './incident.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { VisitRepo } from 'src/visit/visit.repo';
import { PersonRepo } from 'src/person/person.repo';

@Module({
  controllers: [IncidentController],
  providers: [
    IncidentService,
    IncidentRepo,
    PrismaService,
    VisitRepo,
    PersonRepo,
  ],
})
export class IncidentModule {}
