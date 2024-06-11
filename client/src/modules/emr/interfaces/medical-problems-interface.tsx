export interface MedicalProblemsInterface {
  id?: number | string;
  patientId?: string;
  name: string;
  beginDate: Date | null;
  endDate: Date | null;
  verification: string;
  comments: string;
}
