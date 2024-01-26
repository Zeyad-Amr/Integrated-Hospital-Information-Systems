// import * as Yup from "yup";
import { TriageAXInterface, TriageAXInterfaceWithoutVitals } from "../interfaces/triageAX-interface";

export default class TriageAXEntity implements TriageAXInterfaceWithoutVitals {
  mainComplaint: string;
  LOCId?: number;
  triageTypeId?: number;
  comorbidityIds: number[];
  transferTo: string;

  constructor(data: TriageAXInterface) {
    this.mainComplaint = data.mainComplaint;
    this.LOCId = data.LOCId;
    this.triageTypeId = data.triageTypeId;
    this.comorbidityIds = data.comorbidityIds;
    this.transferTo = data.transferTo;
  }

  static defaultValue(): TriageAXInterfaceWithoutVitals {
    return {
      mainComplaint: "",
      LOCId: undefined,
      triageTypeId: undefined,
      comorbidityIds: [],
      transferTo: "",
    };
  }

  // static getSchema(): Yup.ObjectSchema<TriageAXInterface> {
  //     return Yup.object().shape({
  //         mainComplaint: Yup.string().required('الشكوى الرئيسية مطلوبة'),
  //         LOCId: Yup.number().required('رقم الموقع مطلوب'),
  //         triageTypeId: Yup.number().required('رقم نوع التصفية مطلوب'),
  //         comorbidityIds: Yup.array().of(Yup.number()).required('الأمراض المصاحبة مطلوبة'),
  //         transferTo: Yup.string().required('النقل إلى مكان مطلوب'),
  //         vitals: Yup.object().shape({
  //             CVP: Yup.number().required('الضغط المركزي مطلوب'),
  //             GCS: Yup.number().required('درجة الوعي مطلوبة'),
  //             painScore: Yup.number().required('درجة الألم مطلوبة'),
  //             PR: Yup.number().required('معدل ضربات القلب مطلوب'),
  //             RR: Yup.number().required('معدل التنفس مطلوب'),
  //             SpO2: Yup.number().required('تشبع الأكسجين مطلوب'),
  //             temp: Yup.number().required('درجة الحرارة مطلوبة'),
  //             SBP: Yup.number().required('ضغط الدم الانقباضي مطلوب'),
  //             DBP: Yup.number().required('ضغط الدم الانبساطي مطلوب'),
  //         }),
  //     }).defined();
  // }
}
