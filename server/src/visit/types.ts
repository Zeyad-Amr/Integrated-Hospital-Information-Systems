import { $Enums, Prisma } from "@prisma/client";

export interface UpdateVisit {
    mainComplaint?: string;
    status?: $Enums.VisitStatus;
    transfers?: Prisma.TransferCreateNestedManyWithoutVisitInput;
    triageAx?: Prisma.TriageAxCreateNestedOneWithoutVisitInput;
    vitals?: Prisma.VitalsCreateNestedManyWithoutVisitInput;
    diagnosis?: Prisma.DiagnosisCreateNestedManyWithoutVisitInput;
    primarySurveys?: Prisma.PrimarySurveyCreateNestedOneWithoutVisitInput;
    surgeries?: Prisma.SurgeryCreateNestedManyWithoutVisitInput;
    labTests?: Prisma.LabTestCreateNestedManyWithoutVisitInput;
    images?: Prisma.ImageCreateNestedManyWithoutVisitInput;
    prescription?: Prisma.PrescriptionCreateNestedManyWithoutVisitInput;
    consultationRequest?: Prisma.ConsultationRequestCreateNestedManyWithoutVisitInput;
}