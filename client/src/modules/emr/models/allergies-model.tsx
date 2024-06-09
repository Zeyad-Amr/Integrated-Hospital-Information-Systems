import { Yup } from "@/core/shared/utils/validation";
import { AllergiesInterface } from "../interfaces/allergies-interface";

export default class AllergiesModel {
  //*   Default form values
  static defaultValues(): AllergiesInterface {
    return {
      name: "",
      comments: "",
      occurrence: "",
      reaction: "",
      severity: "",
      verification: "",
      beginDate: null,
      endDate: null,
    };
  }

  //* Define validation schema using Yup
  static allergiesFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
      beginDate: Yup.date().nullable().typeError("يجب أن يكون تاريخًا صالحًا"),
      endDate: Yup.date().nullable().typeError("يجب أن يكون تاريخًا صالحًا"),
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: AllergiesInterface): any {
    const formatDateTime = (date: any) => {
      if (!date) return undefined;
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return undefined;
      return parsedDate.toISOString();
    };
  
    return {
      patientId: entity.patientId,
      name: entity.name,
      beginDate: formatDateTime(entity.beginDate),
      endDate: formatDateTime(entity.endDate),
      comments: entity.comments,
      occurrence: entity.occurrence,
      reaction: entity.reaction,
      severity: entity.severity,
      verification: entity.verification,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): AllergiesInterface {
    return {
      id: json.id,
      patientId: json.patientId,
      beginDate: json.beginDate,
      endDate: json.endDate,
      comments: json.comments,
      name: json.name,
      occurrence: json.occurrence,
      reaction: json.reaction,
      severity: json.severity,
      verification: json.verification,
    };
  }
}
