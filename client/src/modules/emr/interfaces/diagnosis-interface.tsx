export interface DiagnosisInterface {
  id?: string;
  name: string;
  description: string;
  icdCode: string;
  type: string;
  patientId?: string;
  visitCode?: string;
}
