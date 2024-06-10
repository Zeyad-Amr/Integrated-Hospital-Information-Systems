import { Yup } from "@/core/shared/utils/validation";
import { MedicalProblemsInterface } from "../interfaces/medical-problems-interface";

export default class MedicalProblemsModel {
  //*   Default form values
  static defaultValues(): MedicalProblemsInterface {
    return {
      name: "",
      comments: "",
      verification: "",
      beginDate: null,
      endDate: null,
    };
  }

  //* Define validation schema using Yup
  static medicalProblemsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: MedicalProblemsInterface): any {
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
      verification: entity.verification,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): MedicalProblemsInterface {
    return {
      id: json.id,
      patientId: json.patientId,
      beginDate: json.beginDate,
      endDate: json.endDate,
      comments: json.comments,
      name: json.name,
      verification: json.verification,
    };
  }
}
