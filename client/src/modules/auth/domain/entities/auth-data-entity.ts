import AuthInterface from "../interfaces/auth-interface";
import * as Yup from "yup";

export default class AuthDataEntity implements AuthInterface {
    private _username: string;
    private _password?: string;
    private _email?: string;

    constructor(data: AuthInterface) {
        this._username = data.username;
        this._password = data.password;
        this._email = data.email;
    }

    //* --------------------- Getters ---------------------
    get username(): string {
        return this._username;
    }

    get password(): string | undefined {
        return this._password;
    }

    get email(): string | undefined {
        return this._email;
    }

    //* --------------------- Setters ---------------------
    set username(username: string) {
        this.username = username;
    }

    set password(password: string | undefined) {
        this.password = password;
    }

    set email(email: string | undefined) {
        this.email = email;
    }

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
            password: Yup.string().min(6, 'الرقم السري لا يقل عن 6 حروف').transform((value, originalValue) => originalValue === undefined ? undefined : value).default(undefined),
            email: Yup.string().email('البريد الألكتروني غير صحيح').transform((value, originalValue) => originalValue === undefined ? undefined : value).default(undefined),
        }).defined();
    }
}


