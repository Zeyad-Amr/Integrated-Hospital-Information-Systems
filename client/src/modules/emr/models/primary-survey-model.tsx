import { Yup } from "@/core/shared/utils/validation";
import { PrimarySurveyInterface } from "../interfaces/primary-survey-interface";

export default class PrimarySurveyModel {
  //*   Default form values
  static defaultValues(): PrimarySurveyInterface {
    return {
      airway: "",
      breathing: "",
      circulation: "",
      disability: "",
      exposure: "",
    };
  }

  // Define validation schema using Yup
  static primarySurveyFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      airway: Yup.string().required("المجرى الهوائي مطلوب"),
      breathing: Yup.string().required("التنفس مطلوب"),
      circulation: Yup.string().required("الدورة الدموية مطلوبة"),
      disability: Yup.string().required("الإعاقة مطلوبة"),
      exposure: Yup.string().required("التعرض مطلوب"),
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
      visitCode: entity.visitCode,
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
