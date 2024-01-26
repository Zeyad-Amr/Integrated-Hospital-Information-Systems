// import * as Yup from "yup";
import { Yup } from "@/core/shared/utils/validation";
import VitalsInterface from "../interfaces/vitals-interface";

export default class VitalsEntity {


  static defaultValue(): VitalsInterface {
    return {
      CVP: undefined,
      diastolicPressure: undefined,
      GCS: undefined,
      painScore: undefined,
      pulseRate: undefined,
      respiratoryRate: undefined,
      SPO2: undefined,
      systolicPressure: undefined,
      temperature: undefined,
    };
  }

  static getSchema(): Yup.ObjectSchema<any> {
    return Yup.object({
      temperature: Yup.string()
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      systolicPressure: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      diastolicPressure: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      GCS: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      CVP: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      respiratoryRate: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      pulseRate: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      SPO2: Yup.string()
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),

      painScore: Yup.string()
        .matches(/^\d+$/, "يجب ألا تحتوي على أرقام عشرية")
        .matches(/^\d+(\.\d+)?(?!.\.$)$/, "يرجى إدخال رقم صحيح"),
    });
  }
}
