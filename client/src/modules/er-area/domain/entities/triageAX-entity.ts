// import * as Yup from "yup";
import TriageAXInterface from "../interfaces/triageAX-interface";
import VitalsInterface from "../interfaces/vitals-interface";

export default class TriageAXEntity implements TriageAXInterface {
    mainComplaint: string;
    LOCId?: number;
    triageTypeId?: number;
    comorbidityIds: number[];
    transferTo: string;
    vitals?: VitalsInterface;


    constructor(data: TriageAXInterface) {
        this.mainComplaint = data.mainComplaint;
        this.LOCId = data.LOCId;
        this.triageTypeId = data.triageTypeId;
        this.comorbidityIds = data.comorbidityIds;
        this.transferTo = data.transferTo;
        this.vitals = data.vitals;
    }

    static defaultValue(): TriageAXInterface {
        return {
            mainComplaint: '',
            LOCId: undefined,
            triageTypeId: undefined,
            comorbidityIds: [],
            transferTo: '',
            vitals: {
                CVP: undefined,
                GCS: undefined,
                painScore: undefined,
                PR: undefined,
                RR: undefined,
                SpO2: undefined,
                temp: undefined,
                SBP: undefined,
                DBP: undefined,
            },
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
