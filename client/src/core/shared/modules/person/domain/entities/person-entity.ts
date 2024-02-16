import store from "@/core/state/store";
import PersonInterface from "../interfaces/person-interface";
import { Yup, } from '@/core/shared/utils/validation';
export default class PersonEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): PersonInterface {
        return {
            id: "",
            firstName: "",
            secondName: "",
            thirdName: "",
            fourthName: "",
            SSN: "",
            verificationMethod: 0,
            gender: 0,
            birthDate: "",
            phone: "",
            governate: 0,
            address: "",
        };
    }

    static handleFormValues(values: PersonInterface): PersonInterface {
        return {
            id: values.id ?? this.defaultValue().id,
            firstName: values.firstName ?? this.defaultValue().firstName,
            secondName: values.secondName ?? this.defaultValue().secondName,
            thirdName: values.thirdName ?? this.defaultValue().thirdName,
            fourthName: values.fourthName ?? this.defaultValue().fourthName,
            address: values.address ?? this.defaultValue().address,
            birthDate: values.birthDate ? values.birthDate.split("T")[0] : this.defaultValue().birthDate,
            gender: values.gender ?? this.defaultValue().gender,
            governate: values.governate ?? this.defaultValue().governate,
            phone: values.phone ?? this.defaultValue().phone,
            verificationMethod: values.verificationMethod ?? this.defaultValue().verificationMethod,
            SSN: values.SSN ?? this.defaultValue().SSN
        }
    }

    // TODO: Replace any with PersonInterface, and fix the error
    static getSchema(): Yup.ObjectSchema<any> {
        const state = store.getState();

        return Yup.object().shape({
            firstName: Yup.string().required("الاسم الأول مطلوب")
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
                .required("الرقم القومي مطلوب")
                .length(14, "يجب أن يكون الرقم القومي 14 رقمًا")
                .matches(/^[0-9]+$/, "يجب أن يكون الرقم القومي رقميًا."),
            verificationMethod: Yup.number().oneOf(state.lookups.lookups.identityTypes.map((e: any) => e.id), "طريقة التحقق مطلوبة").required("طريقة التحقق مطلوبة"),
            gender: Yup.number().oneOf(state.lookups.lookups.genderTypes.map((e: any) => e.id), "الجنس مطلوب").required("الجنس مطلوب"),
            birthDate: Yup.string().required("التاريخ مطلوب"),
            phone: Yup.string().required("رقم الهاتف مطلوب")
                .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
                .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
            governate: Yup.number().oneOf(state.lookups.lookups.governates.map((e: any) => e.id), "المحافظة مطلوبة").required("المحافظة مطلوبة"),
            address: Yup.string()
                .required("العنوان مطلوب")
                .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
                .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
        }).defined();
    }
}