import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PatientRepo } from './patient.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { PersonRepo } from 'src/person/person.repo';
import { VisitRepo } from 'src/visit/visit.repo';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PatientRepo, PrismaService, PersonRepo,VisitRepo],
})
export class PatientModule { }
