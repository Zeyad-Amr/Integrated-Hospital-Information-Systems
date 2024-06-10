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
import { SurgeryModule } from './surgery/surgery.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { MedicalProblemModule } from './medical-problem/medical-problem.module';
import { AllergyModule } from './allergy/allergy.module';
import { MedicationModule } from './medication/medication.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { TriageAxModule } from './triage-ax/triage-ax.module';
import { VitalsModule } from './vitals/vitals.module';
import { PrimarySurveyModule } from './primary-survey/primary-survey.module';
import { RadiologyImageModule } from './radiology-image/radiology-image.module';
import { LabTestModule } from './lab-test/lab-test.module';
import { ConsultationRequestModule } from './consultation-request/consultation-request.module';
import { TransferModule } from './transfer/transfer.module';

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
    SurgeryModule,
    DiagnosisModule,
    MedicalProblemModule,
    AllergyModule,
    MedicationModule,
    PrescriptionModule,
    TriageAxModule,
    VitalsModule,
    PrimarySurveyModule,
    RadiologyImageModule,
    LabTestModule,
    ConsultationRequestModule,
    TransferModule,
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
