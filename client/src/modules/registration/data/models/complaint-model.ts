import { Yup } from "@/core/shared/utils/validation";
import { ComplaintsInterface } from "../../domain/interfaces/complaint-interface";

export default class ComplaintsModel {
    //*   Default form values
    static defaultValues(): ComplaintsInterface {
        return {
            mainComplaint: '',
        };
    }

    //* Define validation schema using Yup
    static complaintsFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            mainComplaint: Yup.string().required('يجب ادخال الشكوى'),
        });
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson( entity: ComplaintsInterface): any {

        return {
            mainComplaint: entity.mainComplaint,
            toSubDepId: 1
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): ComplaintsInterface {
        return {
            id: json.id,
            mainComplaint: json.mainComplaint,
        };
    }
}
