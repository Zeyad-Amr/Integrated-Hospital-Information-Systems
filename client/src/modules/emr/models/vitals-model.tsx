import { Yup } from "@/core/shared/utils/validation";
import { VitalsInterface } from "../interfaces/vitals-interface";

export default class VitalssModel {
    //*   Default form values
    static defaultValues(): VitalsInterface {
        return {
            CVP: undefined,
            GCS: undefined,
            PR: undefined,
            RR: undefined,
            SpO2: undefined,
            temp: undefined,
            SBP: undefined,
            DBP: undefined,
            weight: undefined,
            height: undefined,
        };
    }

    //* Define validation schema using Yup
    static vitalsFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            CVP: Yup.number().nullable().typeError("CVP يجب أن يكون رقمًا"),
            GCS: Yup.number().nullable().typeError("GCS يجب أن يكون رقمًا"),
            PR: Yup.number().nullable().typeError("PR يجب أن يكون رقمًا"),
            RR: Yup.number().nullable().typeError("RR يجب أن يكون رقمًا"),
            SpO2: Yup.number().nullable().typeError("SpO2 يجب أن يكون رقمًا"),
            temp: Yup.number().nullable().typeError("درجة الحرارة يجب أن تكون رقمًا"),
            SBP: Yup.number().nullable().typeError("SBP يجب أن يكون رقمًا"),
            DBP: Yup.number().nullable().typeError("DBP يجب أن يكون رقمًا"),
            weight: Yup.number().nullable().typeError("الوزن يجب أن يكون رقمًا"),
            height: Yup.number().nullable().typeError("الطول يجب أن يكون رقمًا"),
        });
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(updating: boolean, entity: VitalsInterface): any {

        return {
            CVP: Number(entity.CVP),
            GCS: Number(entity.GCS),
            PR: Number(entity.PR),
            RR: Number(entity.RR),
            SpO2: Number(entity.SpO2),
            temp: Number(entity.temp),
            SBP: Number(entity.SBP),
            DBP: Number(entity.DBP),
            weight: Number(entity.weight),
            height: Number(entity.height),
            patientId: updating ? undefined : entity.patientId,
            visitCode: updating ? undefined : entity.visitCode,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): VitalsInterface {
        return {
            id: json.id,
            CVP: json.CVP,
            GCS: json.GCS,
            PR: json.PR,
            RR: json.RR,
            SpO2: json.SpO2,
            temp: json.temp,
            SBP: json.SBP,
            DBP: json.DBP,
            weight: json.weight,
            height: json.height,
            patientId: json.patientId,
            visitCode: json.visitCode,
        };
    }
}
