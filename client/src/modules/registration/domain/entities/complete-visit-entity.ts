import * as Yup from "yup";
import store from "@/core/state/store";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";

interface PersonInputInterface extends Omit<PersonInterface, "id"> {}

export default class CompleteVisitEntity {
  static handleNullFormValues(patient: PersonInterface): PersonInterface {
    const processedPatient: PersonInterface = { ...patient };

    for (const key in processedPatient) {
      if (processedPatient.hasOwnProperty(key)) {
        const value = processedPatient[key as keyof PersonInterface];
        if (value === null) {
          if (typeof value === "string") {
            processedPatient[key as keyof PersonInterface] = "" as any;
          } else if (typeof value === "number") {
            processedPatient[key as keyof PersonInterface] = 0 as any;
          }
        }
      }
    }

    return processedPatient;
  }

  static getPatientSchema(): Yup.ObjectSchema<PersonInputInterface> {
    const state = store.getState();
    const coditionCallback = (
      values: any[],
      schema: any,
      msg?: string,
      oneOfArr?: number[]
    ) => {
      const SSN = values[0];
      const isSSN = !!SSN && SSN.length === 14 && /^[0-9]+$/.test(SSN);
      if (isSSN) {
        return oneOfArr
          ? schema.oneOf(oneOfArr, msg).required(msg)
          : schema.required(msg);
      }
      return schema;
    };

    return Yup.object().shape(
      {
        firstName: Yup.string()
          .when(["SSN"], (values, schema) =>
            coditionCallback(values, schema, "الاسم الأول مطلوب")
          )
          .min(3, "يجب أن يكون الاسم الأول على الأقل 3 أحرف")
          .max(45, "يجب أن يكون الاسم الأول على الأكثر 45 حرفًا"),
        secondName: Yup.string()
          .when(["SSN"], (values, schema) =>
            coditionCallback(values, schema, "الاسم الثاني مطلوب")
          )
          .min(3, "يجب أن يكون الاسم الثاني على الأقل 3 أحرف")
          .max(45, "يجب أن يكون الاسم الثاني على الأكثر 45 حرفًا"),
        thirdName: Yup.string()
          .when(["SSN"], (values, schema) =>
            coditionCallback(values, schema, "الاسم الثالث مطلوب")
          )
          .min(3, "يجب أن يكون الاسم الثالث على الأقل 3 أحرف")
          .max(45, "يجب أن يكون الاسم الثالث على الأكثر 45 حرفًا"),
        fourthName: Yup.string()
          .when(["SSN"], (values, schema) =>
            coditionCallback(values, schema, "الاسم الرابع مطلوب")
          )
          .min(3, "يجب أن يكون الاسم الرابع على الأقل 3 أحرف")
          .max(45, "يجب أن يكون الاسم الرابع على الأكثر 45 حرفًا"),
        SSN: Yup.string()
          .when(["SSN"], (values, schema) =>
            coditionCallback(values, schema, "الرقم القومي مطلوب")
          )
          .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا.")
          .length(14, "يجب أن يكون الرقم القومي 14 رقمًا"),
        verificationMethod: Yup.number().when(["SSN"], (values, schema) =>
          coditionCallback(
            values,
            schema,
            "طريقة التحقق مطلوبة",
            state.lookups.lookups.identityTypes.map((e) => e.id)
          )
        ),
        gender: Yup.number().required("الجنس مطلوب").oneOf(state.lookups.lookups.genderTypes.map((e) => e.id), "الجنس مطلوب"),
        birthDate: Yup.string().when(["SSN"], (values, schema) =>
          coditionCallback(values, schema, "التاريخ مطلوب")
        ),
        phone: Yup.string()
          .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا.")
          .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا"),
        governate: Yup.number().when(["SSN"], (values, schema) =>
          coditionCallback(
            values,
            schema,
            "المحافظة مطلوبة",
            state.lookups.lookups.governates.map((e) => e.id)
          )
        ),
        address: Yup.string()
          .when(["SSN"], (values, schema) =>
            coditionCallback(values, schema, "العنوان مطلوب")
          )
          .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
          .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
      },
      [["SSN", "SSN"]]
    );
  }
}
