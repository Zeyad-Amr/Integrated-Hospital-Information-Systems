import VitalsInterface from "./vitals-interface";

export interface TriageAXInterface {
  mainComplaint: string;
  LOCId?: number;
  triageTypeId?: number;
  comorbidityIds?: number[];
  transferTo: string;
  vitals?: VitalsInterface;
}
export interface TriageAXInterfaceWithoutVitals extends Omit<TriageAXInterface, 'vitals'> {
}
