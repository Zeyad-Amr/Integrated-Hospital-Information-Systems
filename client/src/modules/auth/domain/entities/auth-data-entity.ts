import AuthInterface from "../interfaces/auth-interface";
import * as Yup from "yup";

export default class AuthDataEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): AuthInterface {
        return {
            username: '',
            password: '',
            email: '',
        };
    }

    static getSchema(): Yup.ObjectSchema<AuthInterface> {
        return Yup.object().shape({
            username: Yup.string().required('اسم المستخدم مطلوب').min(3, 'اسم المستخدم لا يقل عن 3 حروف').max(45, 'اسم المستخدم لا يزيد عن 45 حرف'),
            password: Yup.string().min(6, 'الرقم السري لا يقل عن 6 حروف').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                "يجب أن يحتوي على حرف كبير واحد، حرف صغير واحد، رقم واحد"
            ).transform((value, originalValue) => originalValue === undefined ? undefined : value).default(undefined),
            email: Yup.string().email('البريد الألكتروني غير صحيح').transform((value, originalValue) => originalValue === undefined ? undefined : value).default(undefined),
        }).defined();
    }
}


