import { Yup } from "@/core/shared/utils/validation";
import { TriageInterface } from "../interfaces/triage-interface";

export default class TriageModel {
    //*   Default form values
    static defaultValues(): TriageInterface {
        return {
            painScore: '',
            LOCId: '',
            triageTypeId: '',
        };
    }

    //* Define validation schema using Yup
    static triageFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            painScore: Yup.number().nullable().typeError("Pain Score يجب أن يكون رقمًا"),
            LOCId: Yup.number().nullable().typeError("LOC Id يجب أن يكون رقمًا"),
            triageTypeId: Yup.number().typeError("Triage Type Id يجب أن يكون رقمًا"),
        });
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: TriageInterface): any {
            
        return {
            painScore: Number(entity.painScore) || undefined,
            LOCId: Number(entity.LOCId) || undefined,
            triageTypeId: Number(entity.triageTypeId) || undefined,
            visitCode: entity.visitCode,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): TriageInterface {
        return {
            id: json.id,
            painScore: json.painScore,
            LOCId: json.consciousnessLevel.value,
            triageTypeId: json.triage.value,
            visitCode: json.visitCode,
        };
    }
}
