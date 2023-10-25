import { Module } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { UserModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [ UserModule, PatientModule, PersonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
