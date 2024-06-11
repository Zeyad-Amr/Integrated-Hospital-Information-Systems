import { Yup } from '@/core/shared/utils/validation';
import VisitInterface from '../interfaces/visit-interface';
import store from '@/core/state/store';
import PersonInterface from '@/core/shared/modules/person/domain/interfaces/person-interface';
import PersonEntity from '@/core/shared/modules/person/domain/entities/person-entity';
import { CompanionInterface } from '../interfaces/companion-interface';
import { TransferDataInterface } from '../interfaces/transfer-data-interface';

interface PersonInputInterface extends Omit<PersonInterface, 'id' | 'createdAt' | 'updatedAt'> { }

export default class VisitEntity {

    static defaultValue(): VisitInterface {
        return {
            code: undefined,
            sequenceNumber: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            patient: undefined,
            companion: undefined,
            additionalInfo: undefined
        }
    }
    
    static transferDataValue(): TransferDataInterface {
        return {
            toSubDepId: 0,
            transferDate: "",
        }
    }

    static companionDefaultValue(): CompanionInterface {
        return {
            kinship: 0,
            ...PersonEntity.defaultValue()
        }
    }


    static getCompanionSchema(allRequired: boolean = false): Yup.ObjectSchema<PersonInputInterface> {
        const state = store.getState();
        const coditionCallback = (values: any[], schema: any, msg?: string, oneOfArr?: number[]) => {
            if (!values.every((value) => value === undefined || value === "" || value === 0) || allRequired) {
                if (values[0] === 0 && oneOfArr) {
                    return schema.oneOf(oneOfArr, msg).required(msg)
                }
                return schema.required(msg)
            }
            return schema
        }
        const generateFieldCombinations = (fields: string[]): [string, string][] => {
            const combinations: [string, string][] = [];

            for (let i = 0; i < fields.length; i++) {
                for (let j = i + 1; j < fields.length; j++) {
                    combinations.push([fields[i], fields[j]]);
                }
            }

            return combinations;
        }

        return Yup.object().shape({
            kinship: Yup.number()
                .when(['kinship', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address'],
                    (values, schema) => coditionCallback(values, schema, "درجة القرابة مطلوبة", state.lookups.lookups.kinshipTypes.map((e) => +e.id))),
            firstName: Yup.string()
                .when(['secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الأول مطلوب"))
                .min(3, "يجب أن يكون الاسم الأول على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الأول على الأكثر 45 حرفًا"),
            secondName: Yup.string()
                .when(['firstName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الثاني مطلوب"))
                .min(3, "يجب أن يكون الاسم الثاني على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثاني على الأكثر 45 حرفًا"),
            thirdName: Yup.string()
                .when(['firstName', 'secondName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الثالث مطلوب"))
                .min(3, "يجب أن يكون الاسم الثالث على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثالث على الأكثر 45 حرفًا"),
            fourthName: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الرابع مطلوب"))
                .min(3, "يجب أن يكون الاسم الرابع على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الرابع على الأكثر 45 حرفًا"),
            SSN: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "الرقم القومي مطلوب"))
                .length(14, "يجب أن يكون الرقم القومي 14 رقمًا")
                .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا."),
            verificationMethod: Yup.number()
                .when(['verificationMethod', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "طريقة التحقق مطلوبة", state.lookups.lookups.identityTypes.map((e) => +e.id))),
            gender: Yup.number()
                .when(['gender', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'birthDate', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "الجنس مطلوب", state.lookups.lookups.genderTypes.map((e) => +e.id))),
            birthDate: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'phone', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "التاريخ مطلوب")),
            phone: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'governate', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "رقم الهاتف مطلوب"))
                .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
                .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
            governate: Yup.number()
                .when(['governate', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'address', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "المحافظة مطلوبة", state.lookups.lookups.governates.map((e) => +e.id))),
            address: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'kinship'],
                    (values, schema) => coditionCallback(values, schema, "العنوان مطلوب"))
                .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
                .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
        }, [["verificationMethod", "verificationMethod"], ["governate", "governate"], ["gender", "gender"], ["kinship", "kinship"],
        ...generateFieldCombinations(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethod', 'gender', 'birthDate', 'phone', 'governate', 'address', 'kinship'])]);
    }

    static getPatientSchema(isRequired: boolean = true): Yup.ObjectSchema<PersonInputInterface> {
        const state = store.getState();
        const coditionCallback = (values: any[], schema: any, msg?: string, oneOfArr?: number[]) => {
            if (isRequired) {
                if (values[0] === 0 && oneOfArr) {
                    return schema.oneOf(oneOfArr, msg).required(msg)
                }
                return schema.required(msg)
            }
            return schema
        }


        return Yup.object().shape({
            sequenceNumber: Yup.number()
                .required("يجب ادخال رقم التردد"),
            firstName: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "الاسم الأول مطلوب"))
                .min(3, "يجب أن يكون الاسم الأول على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الأول على الأكثر 45 حرفًا"),
            secondName: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "الاسم الثاني مطلوب"))
                .min(3, "يجب أن يكون الاسم الثاني على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثاني على الأكثر 45 حرفًا"),
            thirdName: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "الاسم الثالث مطلوب"))
                .min(3, "يجب أن يكون الاسم الثالث على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثالث على الأكثر 45 حرفًا"),
            fourthName: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "الاسم الرابع مطلوب"))
                .min(3, "يجب أن يكون الاسم الرابع على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الرابع على الأكثر 45 حرفًا"),
            SSN: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "الرقم القومي مطلوب"))
                .length(14, "يجب أن يكون الرقم القومي 14 رقمًا")
                .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا."),
            verificationMethod: Yup.number()
                .when(["verificationMethod"],
                    (values, schema) => coditionCallback(values, schema, "طريقة التحقق مطلوبة", state.lookups.lookups.identityTypes.map((e) => +e.id))),
            gender: Yup.number().required("الجنس مطلوب").oneOf(state.lookups.lookups.genderTypes.map((e) => +e.id), "الجنس مطلوب"),
            birthDate: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "التاريخ مطلوب")),
            phone: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "رقم الهاتف مطلوب"))
                .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
                .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
            governate: Yup.number()
                .when(["governate"],
                    (values, schema) => coditionCallback(values, schema, "المحافظة مطلوبة", state.lookups.lookups.governates.map((e) => +e.id))),
            address: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "العنوان مطلوب"))
                .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
                .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
        },
            [["verificationMethod", "verificationMethod"], ["governate", "governate"]]
        );
    }

    static sequenceNumberSchema(): Yup.ObjectSchema<any> {
        return Yup.object({
            sequenceNumber: Yup.number()
                .required("يجب ادخال رقم التردد")
        })
    }

    static transferDataSchema(): Yup.ObjectSchema<any> {
    const state = store.getState();
    return Yup.object({
      toSubDepId: Yup.number()
      .required("نقل المريض الي قسم فرعي مطلوب").oneOf((state.subDepartments.subDepartments.items as any).map((e : any) => e.id), "نقل المريض الي قسم فرعي مطلوب"),
      transferDate: Yup.string()
        .required('تاريخ نقل المريض مطلوب'),
    });
  }

    static kinshipSchema(isRequired: boolean = false): Yup.ObjectSchema<any> {
        const state = store.getState();

        return Yup.object().shape({
            kinship: Yup.number()
                .when(["kinship"],
                    (values, schema) => {
                        if (isRequired) {
                            if (values[0] === 0) {
                                return schema.oneOf(state.lookups.lookups.kinshipTypes.map((e) => +e.id), "يجب اختيار درجة القرابة").required("يجب اختيار درجة القرابة")
                            }
                            return schema.required("يجب اختيار درجة القرابة")
                        }
                        return schema
                    })

        }, [["kinship", "kinship"]])
    }

}


