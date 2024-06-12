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
      quantity: undefined,
      refills: "",
      beginDate: null,
      substitutionAllowed: "0",
    };
  }

  // Define validation schema using Yup
  static prescriptionsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      drugName: Yup.string()
        .required("اسم الدواء مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
      beginDate: Yup.date()
        .nullable()
        .required("تاريخ البداية مطلوب")
        .typeError("يجب أن يكون تاريخًا صالحًا")
        .required("تاريخ البدء مطلوب"),
      quantity: Yup.number()
        .integer("يجب أن يكون الكمية عددًا صحيحًا")
        .moreThan(0, "يجب أن تكون الكمية أكبر من 0")
        .required("الكمية مطلوبة"),
      dosage: Yup.string().required("الجرعة مطلوبة"),
      substitutionAllowed: Yup.string()
        .required("السماح بالاستبدال مطلوب")
        .oneOf(
          [
            {
              id: "1",
              value: "No",
            },
            {
              id: "2",
              value: "Yes",
            },
          ].map((e) => e.id),
          "السماح بالاستبدال مطلوب"
        ),
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
      visitCode: entity.visitCode,
      drugName: entity.drugName,
      beginDate: formatDateTime(entity.beginDate),
      dosage: entity.dosage,
      medicineUnit: entity.medicineUnit,
      notes: entity.notes,
      quantity: Number(entity.quantity),
      refills: entity.refills,
      substitutionAllowed:
        entity.substitutionAllowed == "2"
          ? true
          : entity.substitutionAllowed == "1"
          ? false
          : undefined,
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
      substitutionAllowed: json.substitutionAllowed ? "2" : "1",
    };
  }
}
