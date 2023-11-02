import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { UserModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { PersonModule } from './person/person.module';
import { VisitModule } from './visit/visit.module';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [ UserModule, PatientModule, PersonModule, VisitModule, IncidentModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
