export interface MedicationsInterface {
  id?: string;
  patientId?: string;
  drugName: string;
  beginDate: Date | null;
  endDate: Date | null;
  medicationUsage: string;
  dosageInstruction: string;
  comments: string;
}
