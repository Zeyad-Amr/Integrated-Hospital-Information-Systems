// import * as Yup from "yup";
import {
  TriageAXInterface,
  TriageAXInterfaceWithoutVitals,
} from "../interfaces/triageAX-interface";
import VitalsInterface from "../interfaces/vitals-interface";

export default class VitalsEntity {

  constructor(private vitals: VitalsInterface) {
  }

  static defaultValue(): VitalsInterface {
    return {
        CVP: undefined,
        GCS: undefined,
        painScore: undefined,
        PR: undefined,
        RR: undefined,
        SpO2: undefined,
        temp: undefined,
        SBP: undefined,
        DBP: undefined,
    };
  }
}
