import { Yup } from "@/core/shared/utils/validation";
import { DiagnosisInterface } from "../interfaces/diagnosis-interface";

export default class DiagnosisModel {
  //*   Default form values
  static defaultValues(): DiagnosisInterface {
    return {
      name: "",
      description: "",
      icdCode: "",
      type: "",
    };
  }

  //* Define validation schema using Yup
  static diagnosisFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: DiagnosisInterface): any {
    return {
      icdCode: entity.icdCode,
      name: entity.name,
      description: entity.description,
      type: entity.type,
      patientId: entity.patientId,
      visitCode: entity.visitCode,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): DiagnosisInterface {
    return {
      id: json.id,
      patientId: json.patientId,
      visitCode: json.visitCode,
      description: json.description,
      icdCode: json.icdCode,
      name: json.name,
      type: json.type,
    };
  }
}
