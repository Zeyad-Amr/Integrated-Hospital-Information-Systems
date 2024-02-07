import * as Yup from "yup";
import { TriageAXInterfaceWithoutVitals } from "../interfaces/triageAX-interface";

export default class TriageAXEntity {
  static defaultValue(): TriageAXInterfaceWithoutVitals {
    return {
      mainComplaint: "",
      LOCId: 0,
      triageTypeId: 0,
      comorbidityIds: [],
      transferTo: "",
    };
  }

  static getSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      complaint: Yup.string().required("الشكوى مطلوبة"),

      transferTo: Yup.string().required("نقل إلى مطلوب"),

      comorbidities: Yup.array(),

      triage: Yup.string(),

      consciousnessLevel: Yup.string(),
    });
  }
}
