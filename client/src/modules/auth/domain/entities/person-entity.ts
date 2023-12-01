export default class PersonEntity {
    private _id: string;
    private _firstName: string;
    private _secondName: string;
    private _thirdName: string;
    private _fourthName: string;
    private _SSN: string;
    private _verificationMethod: string;
    private _gender: string;
    private _birthDate: Date;
    private _phone: string;
    private _email: string;
    private _governate: string;
    private _address: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(data: {
        id: string;
        firstName: string;
        secondName: string;
        thirdName: string;
        fourthName: string;
        SSN: string;
        verificationMethod: string;
        gender: string;
        birthDate: Date;
        phone: string;
        email: string;
        governate: string;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
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
    get id(): string {
        return this._id;
    }

    get firstName(): string {
        return this._firstName;
    }

    get secondName(): string {
        return this._secondName;
    }

    get thirdName(): string {
        return this._thirdName;
    }

    get fourthName(): string {
        return this._fourthName;
    }

    get SSN(): string {
        return this._SSN;
    }

    get verificationMethod(): string {
        return this._verificationMethod;
    }

    get gender(): string {
        return this._gender;
    }

    get birthDate(): Date {
        return this._birthDate;
    }

    get phone(): string {
        return this._phone;
    }

    get email(): string {
        return this._email;
    }

    get governate(): string {
        return this._governate;
    }

    get address(): string {
        return this._address;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
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

    set verificationMethod(verificationMethod: string) {
        this._verificationMethod = verificationMethod;
    }

    set gender(gender: string) {
        this._gender = gender;
    }

    set birthDate(birthDate: Date) {
        this._birthDate = birthDate;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    set email(email: string) {
        this._email = email;
    }

    set governate(governate: string) {
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
    static defaultValue(): PersonEntity {
        const defaultDate = new Date();
        return new PersonEntity({
            id: '',
            firstName: '',
            secondName: '',
            thirdName: '',
            fourthName: '',
            SSN: '',
            verificationMethod: '',
            gender: '',
            birthDate: defaultDate,
            phone: '',
            email: '',
            governate: '',
            address: '',
            createdAt: defaultDate,
            updatedAt: defaultDate,
        });
    }
}
