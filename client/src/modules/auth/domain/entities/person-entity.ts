import { identityList } from "../data-values/constants";
import { GenderEnum, GovernateEnum, IdentityEnum } from "../data-values/enums";
import { IGender, IGovernate, IIdentity } from "../data-values/interfaces";
import PersonInterface from "../interfaces/person-interface";
import { Yup, } from '@/core/shared/utils/validation';
export default class PersonEntity implements PersonInterface {
    private _id: string;
    private _firstName?: string;
    private _secondName?: string;
    private _thirdName?: string;
    private _fourthName?: string;
    private _SSN?: string;
    private _verificationMethod?: IIdentity;
    private _gender?: IGender;
    private _birthDate?: Date;
    private _phone?: string;
    private _governate?: IGovernate;
    private _address?: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor(data: PersonInterface) {
        this._id = data.id;
        this._firstName = data.firstName;
        this._secondName = data.secondName;
        this._thirdName = data.thirdName;
        this._fourthName = data.fourthName;
        this._SSN = data.SSN;
        this._verificationMethod = data.verificationMethod;
        this._gender = data.gender;
        this._birthDate = data.birthDate;
        this._phone = data.phone;
        this._governate = data.governate;
        this._address = data.address;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
    }

    //* --------------------- Getters ---------------------

    get id(): string {
        return this._id;
    }

    get firstName(): string | undefined {
        return this._firstName;
    }

    get secondName(): string | undefined {
        return this._secondName;
    }

    get thirdName(): string | undefined {
        return this._thirdName;
    }

    get fourthName(): string | undefined {
        return this._fourthName;
    }

    get SSN(): string | undefined {
        return this._SSN;
    }

    get verificationMethod(): IIdentity | undefined {
        return this._verificationMethod;
    }

    get gender(): IGender | undefined {
        return this._gender;
    }

    get birthDate(): Date | undefined {
        return this._birthDate;
    }

    get phone(): string | undefined {
        return this._phone;
    }

    get governate(): IGovernate | undefined {
        return this._governate;
    }

    get address(): string | undefined {
        return this._address;
    }
    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    //* --------------------- Setters ---------------------
    set id(id: string) {
        this._id = id;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    set secondName(secondName: string) {
        this._secondName = secondName;
    }

    set thirdName(thirdName: string) {
        this._thirdName = thirdName;
    }

    set fourthName(fourthName: string) {
        this._fourthName = fourthName;
    }

    set SSN(SSN: string) {
        this._SSN = SSN;
    }

    set verificationMethod(verificationMethod: IIdentity) {
        this._verificationMethod = verificationMethod;
    }

    set gender(gender: IGender) {
        this._gender = gender;
    }

    set birthDate(birthDate: Date) {
        this._birthDate = birthDate;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    set governate(governate: IGovernate) {
        this._governate = governate;
    }

    set address(address: string) {
        this._address = address;
    }

    set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): PersonInterface {
        return {
            id: '',
            firstName: undefined,
            secondName: undefined,
            thirdName: undefined,
            fourthName: undefined,
            SSN: undefined,
            verificationMethod: identityList[0],
            gender: undefined,
            birthDate: undefined,
            phone: undefined,
            governate: undefined,
            address: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };
    }

    // TODO: Replace any with PersonInterface, and fix the error
    static getSchema(): Yup.ObjectSchema<any> {
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
            verificationMethod: Yup.string()
                .oneOf(Object.values(IdentityEnum).map(String) as string[])
                .required("نوع الهوية مطلوب"),
            gender: Yup.string().oneOf(Object.values(GenderEnum).map(String) as string[]),
            birthDate: Yup.string().required("التاريخ مطلوب"),
            phone: Yup.string()
                .length(11, "يجب أن يكون رقم الهاتف 11 حرفًا")
                .matches(/^[0-9]+$/, "يجب أن يكون رقم الهاتف رقميًا."),
            governate: Yup.string().oneOf(Object.values(GovernateEnum).map(String) as string[]),
            address: Yup.string()
                .required("العنوان مطلوب")
                .min(3, "يجب أن يكون العنوان على الأقل 3 أحرف")
                .max(100, "يجب أن يكون العنوان على الأكثر 100 حرفًا"),
        }).defined();
    }
}