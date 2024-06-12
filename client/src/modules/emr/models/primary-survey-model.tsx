import { Yup } from "@/core/shared/utils/validation";
import { PrimarySurveyInterface } from "../interfaces/primary-survey-interface";

export default class PrimarySurveyModel {
    //*   Default form values
    static defaultValues(): PrimarySurveyInterface {
        return {
            airway: '',
            breathing: '',
            circulation: '',
            disability: '',
            exposure: '',
        };
    }

    //* Define validation schema using Yup
    static surveyFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            airway: Yup.string().required("Airway is required"),
            breathing: Yup.string().required("Breathing is required"),
            circulation: Yup.string().required("Circulation is required"),
            disability: Yup.string().required("Disability is required"),
            exposure: Yup.string().required("Exposure is required"),
        });
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: PrimarySurveyInterface): any {

        return {
            airway: entity.airway,
            breathing: entity.breathing,
            circulation: entity.circulation,
            disability: entity.disability,
            exposure: entity.exposure,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): PrimarySurveyInterface {
        return {
            id: json.id,
            airway: json.airway,
            breathing: json.breathing,
            circulation: json.circulation,
            disability: json.disability,
            exposure: json.exposure,
        };
    }
}
