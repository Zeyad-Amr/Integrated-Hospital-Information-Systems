import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { PersonModule } from './person/person.module';
import { EmployeeModule } from './employee/employee.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [AuthModule, PatientModule, PersonModule, EmployeeModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule { }
