import PersonInterface from "../interfaces/person-interface";

export default class PersonEntity implements PersonInterface {
    private _id?: string;
    private _firstName?: string;
    private _secondName?: string;
    private _thirdName?: string;
    private _fourthName?: string;
    private _SSN: string;
    private _verificationMethod: string;
    private _gender?: string;
    private _birthDate?: Date;
    private _phone?: string;
    private _email?: string;
    private _governate?: string;
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
        this._email = data.email;
        this._governate = data.governate;
        this._address = data.address;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
    }

    //* --------------------- Getters ---------------------

    get id(): string | undefined {
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

    get SSN(): string {
        return this._SSN;
    }

    get verificationMethod(): string {
        return this._verificationMethod;
    }

    get gender(): string | undefined {
        return this._gender;
    }

    get birthDate(): Date | undefined {
        return this._birthDate;
    }

    get phone(): string | undefined {
        return this._phone;
    }

    get email(): string | undefined {
        return this._email;
    }

    get governate(): string | undefined {
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
    set id(id: string | undefined) {
        this._id = id;
    }

    set firstName(firstName: string | undefined) {
        this._firstName = firstName;
    }

    set secondName(secondName: string | undefined) {
        this._secondName = secondName;
    }

    set thirdName(thirdName: string | undefined) {
        this._thirdName = thirdName;
    }

    set fourthName(fourthName: string | undefined) {
        this._fourthName = fourthName;
    }

    set SSN(SSN: string) {
        this._SSN = SSN;
    }

    set verificationMethod(verificationMethod: string) {
        this._verificationMethod = verificationMethod;
    }

    set gender(gender: string | undefined) {
        this._gender = gender;
    }

    set birthDate(birthDate: Date | undefined) {
        this._birthDate = birthDate;
    }

    set phone(phone: string | undefined) {
        this._phone = phone;
    }

    set email(email: string | undefined) {
        this._email = email;
    }

    set governate(governate: string | undefined) {
        this._governate = governate;
    }

    set address(address: string | undefined) {
        this._address = address;
    }

    set createdAt(createdAt: Date | undefined) {
        this._createdAt = createdAt;
    }

    set updatedAt(updatedAt: Date | undefined) {
        this._updatedAt = updatedAt;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): PersonInterface {
        return {
            id: undefined,
            firstName: undefined,
            secondName: undefined,
            thirdName: undefined,
            fourthName: undefined,
            SSN: '',
            verificationMethod: '',
            gender: undefined,
            birthDate: undefined,
            phone: undefined,
            email: undefined,
            governate: undefined,
            address: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };
    }
}
