import { Yup } from "@/core/shared/utils/validation";
import { LabsInterface } from "../interfaces/labs-interface";

export default class LabsModel {
    //*   Default form values
    static defaultValues(): LabsInterface {
        return {
            name: '',
            url: '',
        };
    }

    //* Define validation schema using Yup
    static labsFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            name: Yup.string().required('يجب ادخال الاسم'),
            url: Yup.string()
        });
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson( entity: LabsInterface): any {

        return {
            name: entity.name,
            url: entity.url,
            patientId: entity.patientId,
            visitCode: entity.visitCode,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): LabsInterface {
        return {
            id: json.id,
            name: json.name,
            url: json.url,
            patientId: json.patientId,
            visitCode: json.visitCode,
        };
    }
}
