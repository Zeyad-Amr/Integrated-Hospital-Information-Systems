import { Yup } from "@/core/shared/utils/validation";
import { SurgeriesInterface } from "../interfaces/surgeries-interface";

export default class SurgeriesModel {
  //*   Default form values
  static defaultValues(): SurgeriesInterface {
    return {
      name: "",
      description: "",
      place: "",
    };
  }

  //* Define validation schema using Yup
  static surgeriesFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      name: Yup.string()
        .required("الاسم مطلوب")
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: SurgeriesInterface): any {
    return {
      name: entity.name,
      description: entity.description,
      place: entity.place,
      patientId: entity.patientId,
      visitCode: entity.visitCode,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): SurgeriesInterface {
    return {
      id: json.id,
      patientId: json.patientId,
      visitCode: json.visitCode,
      place: json.place,
      description: json.description,
      name: json.name,
    };
  }
}
