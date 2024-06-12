import { Yup } from "@/core/shared/utils/validation";
import { RadiologiesInterface } from "../interfaces/radiologies-interface";

export default class RadiologiesModel {
    //*   Default form values
    static defaultValues(): RadiologiesInterface {
        return {
            name: '',
            url: '',
        };
    }

    //* Define validation schema using Yup
    static radiologiesFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            name: Yup.string().required('يجب ادخال الاسم'),
            url: Yup.string()
        });
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson( entity: RadiologiesInterface): any {

        return {
            name: entity.name,
            url: entity.url,
            patientId: entity.patientId,
            visitCode: entity.visitCode,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): RadiologiesInterface {
        return {
            id: json.id,
            name: json.name,
            url: json.url,
            patientId: json.patientId,
            visitCode: json.visitCode,
        };
    }
}
