import { Yup } from "@/core/shared/utils/validation";
import { VitalsInterface } from "../interfaces/vitals-interface";

export default class VitalsModel {
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
    static vitalsFormValidations(isRequired: boolean = false): Yup.ObjectSchema<any> {
        const fieldValidation = (fieldName: string) => {
            return isRequired 
                ? Yup.number().required(`${fieldName} مطلوب`).typeError(`${fieldName} يجب أن يكون رقمًا`)
                : Yup.number().nullable().typeError(`${fieldName} يجب أن يكون رقمًا`);
        };
    
        return Yup.object({
            CVP: fieldValidation("CVP"),
            GCS: fieldValidation("GCS"),
            PR: fieldValidation("PR"),
            RR: fieldValidation("RR"),
            SpO2: fieldValidation("SpO2"),
            temp: fieldValidation("درجة الحرارة"),
            SBP: fieldValidation("SBP"),
            DBP: fieldValidation("DBP"),
            weight: fieldValidation("الوزن"),
            height: fieldValidation("الطول"),
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
