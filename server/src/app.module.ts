import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { PersonModule } from './person/person.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [AuthModule, PatientModule, PersonModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
