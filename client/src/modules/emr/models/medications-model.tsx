import * as Yup from "yup";
import { MedicationsInterface } from "../interfaces/medications-interface";

export default class MedicationsModel {
  //*   Default form values
  static defaultValues(): MedicationsInterface {
    return {
      drugName: "",
      comments: "",
      dosageInstruction: "",
      medicationUsage: "",
      beginDate: null,
      endDate: null,
    };
  }

  //* Define validation schema using Yup
  static medicationsFormValidations(): Yup.ObjectSchema<any> {
    return Yup.object({
      drugName: Yup.string()
        .required("اسم الدواء مطلوب")
        .min(3, "يجب أن يحتوي الاسم على الأقل على 3 أحرف")
        .max(45, "يجب أن يحتوي الاسم على الأكثر 45 حرف"),
      beginDate: Yup.date()
        .nullable()
        .typeError("يجب أن يكون تاريخًا صالحًا")
        .test(
          "beginDate-before-endDate",
          "يجب أن يكون تاريخ البداية قبل تاريخ الانتهاء",
          function (value) {
            const { endDate } = this.parent;
            if (!endDate || !value) {
              // If either date is not provided, do not perform the validation
              return true;
            }
            return new Date(value) < new Date(endDate);
          }
        ),
      endDate: Yup.date()
        .nullable()
        .typeError("يجب أن يكون تاريخًا صالحًا")
        .test(
          "endDate-after-beginDate",
          "يجب أن يكون تاريخ الانتهاء بعد تاريخ البداية",
          function (value) {
            const { beginDate } = this.parent;
            if (!beginDate || !value) {
              // If either date is not provided, do not perform the validation
              return true;
            }
            return new Date(value) >= new Date(beginDate);
          }
        ),
    });
  }

  // //* --------------------- Serialization: Convert the model to JSON ---------------------
  static toJson(entity: MedicationsInterface): any {
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
      endDate: formatDateTime(entity.endDate),
      comments: entity.comments,
      medicationUsage: entity.medicationUsage,
      dosageInstruction: entity.dosageInstruction,
    };
  }

  // //* --------------------- Deserialization: Create a model from JSON data ---------------------
  static fromJson(json: any): MedicationsInterface {
    return {
      id: json.id,
      patientId: json.patientId,
      beginDate: json.beginDate,
      endDate: json.endDate,
      comments: json.comments,
      drugName: json.drugName,
      dosageInstruction: json.dosageInstruction,
      medicationUsage: json.medicationUsage,
    };
  }
}
