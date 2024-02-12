import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { PersonModule } from './person/person.module';
import { VisitModule } from './visit/visit.module';
import { IncidentModule } from './incident/incident.module';
import { EmployeeModule } from './employee/employee.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DepartmentModule } from './department/department.module';
import { StreamingModule } from './streaming/streaming.module';
import { EnumsModule } from './enums/enums.module';
import { SubdepartmentModule } from './subdepartment/subdepartment.module';
import { SpecializationModule } from './specialization/specialization.module';
import { RoomModule } from './room/room.module';
import { FeatureModule } from './feature/feature.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    StreamingModule,
    AuthModule,
    PatientModule,
    PersonModule,
    EmployeeModule,
    VisitModule,
    IncidentModule,
    DepartmentModule,
    StreamingModule,
    EnumsModule,
    SubdepartmentModule,
    SpecializationModule,
    RoomModule,
    FeatureModule,
    PermissionModule,
    RoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply
  }
}
