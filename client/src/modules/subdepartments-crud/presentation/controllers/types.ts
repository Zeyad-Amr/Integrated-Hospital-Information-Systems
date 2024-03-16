import { TriageAXInterface } from "../../domain/interfaces/triageAX-interface";

export interface TriagAXState {
  triagData: TriageAXInterface;
  loading: boolean;
  error: string;
}
