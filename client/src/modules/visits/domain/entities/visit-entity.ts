import { Yup } from '@/core/shared/utils/validation';
import VisitInterface from '../interfaces/visit-interface';
import store from '@/core/state/store';
import PersonInterface from '@/modules/auth/domain/interfaces/person-interface';

interface PersonInputInterface extends Omit<PersonInterface, 'id' | 'createdAt' | 'updatedAt'> { }

export default class VisitEntity {

    static defaultValue(): VisitInterface {
        return {
            code: undefined,
            sequenceNumber: undefined,
            kinship: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            patient: undefined,
            companion: undefined,
            additionalInfo: undefined
        }
    }


    static getCompanionSchema(allRequired: boolean = false): Yup.ObjectSchema<PersonInputInterface> {
        console.log(allRequired);

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
            firstName: Yup.string()
                .when(['secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الأول مطلوب"))
                .min(3, "يجب أن يكون الاسم الأول على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الأول على الأكثر 45 حرفًا"),
            secondName: Yup.string()
                .when(['firstName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الثاني مطلوب"))
                .min(3, "يجب أن يكون الاسم الثاني على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثاني على الأكثر 45 حرفًا"),
            thirdName: Yup.string()
                .when(['firstName', 'secondName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الثالث مطلوب"))
                .min(3, "يجب أن يكون الاسم الثالث على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثالث على الأكثر 45 حرفًا"),
            fourthName: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "الاسم الرابع مطلوب"))
                .min(3, "يجب أن يكون الاسم الرابع على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الرابع على الأكثر 45 حرفًا"),
            SSN: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "الرقم القومي مطلوب"))
                .length(14, "يجب أن يكون الرقم القومي 14 رقمًا")
                .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا."),
            verificationMethod: Yup.number()
                .when(['verificationMethodId', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'genderId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "طريقة التحقق مطلوبة", state.lookups.lookups.identityTypes.map((e) => e.id))),
            gender: Yup.number()
                .when(['genderId', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'birthDate', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "الجنس مطلوب", state.lookups.lookups.genderTypes.map((e) => e.id))),
            birthDate: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'phone', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "التاريخ مطلوب")),
            phone: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'governateId', 'address'],
                    (values, schema) => coditionCallback(values, schema, "رقم الهاتف مطلوب"))
                .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
                .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
            governate: Yup.number()
                .when(['governateId', 'firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'address'],
                    (values, schema) => coditionCallback(values, schema, "المحافظة مطلوبة", state.lookups.lookups.governates.map((e) => e.id))),
            address: Yup.string()
                .when(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId'],
                    (values, schema) => coditionCallback(values, schema, "العنوان مطلوب"))
                .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
                .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
        }, [["verificationMethodId", "verificationMethodId"], ["governateId", "governateId"], ["genderId", "genderId"],
        ...generateFieldCombinations(['firstName', 'secondName', 'thirdName', 'fourthName', 'SSN', 'verificationMethodId', 'genderId', 'birthDate', 'phone', 'governateId', 'address'])]);
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
            firstName: Yup.string()
                .required("الاسم الأول مطلوب")
                .min(3, "يجب أن يكون الاسم الأول على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الأول على الأكثر 45 حرفًا"),
            secondName: Yup.string()
                .required("الاسم الثاني مطلوب")
                .min(3, "يجب أن يكون الاسم الثاني على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثاني على الأكثر 45 حرفًا"),
            thirdName: Yup.string()
                .required("الاسم الثالث مطلوب")
                .min(3, "يجب أن يكون الاسم الثالث على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الثالث على الأكثر 45 حرفًا"),
            fourthName: Yup.string()
                .required("الاسم الرابع مطلوب")
                .min(3, "يجب أن يكون الاسم الرابع على الأقل 3 أحرف")
                .max(45, "يجب أن يكون الاسم الرابع على الأكثر 45 حرفًا"),
            SSN: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "الرقم القومي مطلوب"))
                .length(14, "يجب أن يكون الرقم القومي 14 رقمًا")
                .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا."),
            verificationMethod: Yup.number()
                .when(["verificationMethodId"],
                    (values, schema) => coditionCallback(values, schema, "طريقة التحقق مطلوبة", state.lookups.lookups.identityTypes.map((e) => e.id))),
            gender: Yup.number().oneOf(state.lookups.lookups.genderTypes.map((e) => e.id), "الجنس مطلوب")
                .required("الجنس مطلوب"),
            birthDate: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "التاريخ مطلوب")),
            phone: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "رقم الهاتف مطلوب"))
                .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
                .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
            governate: Yup.number()
                .when(["governateId"],
                    (values, schema) => coditionCallback(values, schema, "المحافظة مطلوبة", state.lookups.lookups.governates.map((e) => e.id))),
            address: Yup.string()
                .when([],
                    (values, schema) => coditionCallback(values, schema, "العنوان مطلوب"))
                .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
                .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
        },
            [["verificationMethodId", "verificationMethodId"], ["governateId", "governateId"]]
        );
    }

    static sequenceNumberSchema(): Yup.ObjectSchema<any> {
        return Yup.object({
            sequenceNumber: Yup.number()
                .required("يجب ادخال رقم التردد")
        })
    }

    static kinshipSchema(isRequired: boolean = false): Yup.ObjectSchema<any> {
        const state = store.getState();

        return Yup.object().shape({
            kinship: Yup.number()
                .when(["kinship"],
                    (values, schema) => {
                        if (isRequired) {
                            if (values[0] === 0) {
                                return schema.oneOf(state.lookups.lookups.kinshipTypes.map((e) => e.id), "يجب اختيار درجة القرابة").required("يجب اختيار درجة القرابة")
                            }
                            return schema.required("يجب اختيار درجة القرابة")
                        }
                        return schema
                    })

        }, [["kinship", "kinship"]])
    }

}


