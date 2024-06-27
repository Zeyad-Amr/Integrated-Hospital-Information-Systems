import { TriageInterface } from "@/modules/emr/interfaces/triage-interface";
import VitalsInterface from "./vitals-interface";

export interface TriageTransferInterface {
  mainComplaint: string;
  toSubDepId: string;
}

export interface TriageAXInterface {
  triageTransfer?: TriageTransferInterface
  triage?: TriageInterface
  vitals?: VitalsInterface;
  patientId?: string
  visitCode?: string
}

