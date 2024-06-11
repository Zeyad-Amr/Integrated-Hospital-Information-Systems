import { Yup } from "@/core/shared/utils/validation";
import { PrescriptionsInterface } from "../interfaces/prescriptions-interface";

export default class PrescriptionsModel {
  //*   Default form values
  static defaultValues(): PrescriptionsInterface {
    return {
      drugName: "",
      dosage: "",
      medicineUnit: "",
      notes: "",
      quantity: null,
      refills: "",
      beginDate: null,
      substitutionAllowed: null,
    };
  }

  //* Define validation schema using Yup
  static prescriptionsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      drugName: Yup.string()
        .required("اسم الدواء مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
      beginDate: Yup.date().nullable().typeError("يجب أن يكون تاريخًا صالحًا"),
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: PrescriptionsInterface): any {
    const formatDateTime = (date: any) => {
      if (!date) return undefined;
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) return undefined;
      return parsedDate.toISOString();
    };

    return {
      patientId: entity.patientId,
      drugName: entity.drugName,
      beginDate: formatDateTime(entity.beginDate),
      dosage: entity.dosage,
      medicineUnit: entity.medicineUnit,
      notes: entity.notes,
      quantity: entity.quantity,
      refills: entity.refills,
      substitutionAllowed: entity.substitutionAllowed,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): PrescriptionsInterface {
    return {
      id: json.id,
      patientId: json.patientId,
      visitCode: json.visitCode,
      beginDate: json.beginDate,
      dosage: json.dosage,
      drugName: json.drugName,
      medicineUnit: json.medicineUnit,
      notes: json.notes,
      quantity: json.quantity,
      refills: json.refills,
      substitutionAllowed: json.substitutionAllowed,
    };
  }
}
