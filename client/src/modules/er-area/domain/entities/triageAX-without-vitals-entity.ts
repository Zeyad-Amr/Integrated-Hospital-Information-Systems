import * as Yup from "yup";
import {  TriageTransferInterface } from "../interfaces/triageAX-interface";

export default class TriageAXEntity {
  
  static triageTransfereDefaultValue(): TriageTransferInterface {
    return {
      mainComplaint: "",
      toSubDepId: "",
    };
  }
  

  static triageTransferSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      mainComplaint: Yup.string().required("الشكوى مطلوبة"),
      toSubDepId: Yup.string().required("نقل إلى مطلوب"),
    });
  }
  static getSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      mainComplaint: Yup.string().required("الشكوى مطلوبة"),

      transferTo: Yup.string().required("نقل إلى مطلوب"),

      comorbidities: Yup.array(),

      triage: Yup.string(),

      consciousnessLevel: Yup.string(),
    });
  }
}
