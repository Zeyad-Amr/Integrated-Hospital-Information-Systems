import * as Yup from "yup";
import { TriageAXInterfaceWithoutVitals } from "../interfaces/triageAX-interface";

export default class TriageAXEntity {
  static defaultValue(): TriageAXInterfaceWithoutVitals {
    return {
      mainComplaint: "",
      LOCId: undefined,
      triageTypeId: undefined,
      comorbidityIds: [],
      transferTo: "",
    };
  }

  static getSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      complaint: Yup.string().required("الشكوى مطلوبة"),

      transferTo: Yup.string().required("نقل إلى مطلوب"),

      comorbidities: Yup.string().required("الأمراض المصاحبة مطلوبة"),

      triage: Yup.string().required("الفرز مطلوب"),

      consciousnessLevel: Yup.string().required("مستوى الوعي مطلوب"),
    });
  }
}
