export default class StaffEntity {
    private _id: string;
    private _name: string;
    private _ssn: string;
    private _email: string;
    private _phone: string;
    private _role: string;

    constructor(data: {
        id: string;
        name: string;
        ssn: string;
        email: string;
        phone: string;
        role: string;
    }) {
        this._id = data.id;
        this._name = data.name;
        this._ssn = data.ssn;
        this._email = data.email;
        this._phone = data.phone;
        this._role = data.role;
    }

    // Getter methods using property accessors
    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get ssn(): string {
        return this._ssn;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }

    get role(): string {
        return this._role;
    }

    // Setter methods using property accessors
    set id(id: string) {
        this._id = id;
    }

    set name(name: string) {
        this._name = name;
    }

    set ssn(ssn: string) {
        this._ssn = ssn;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    set role(role: string) {
        this._role = role;
    }
}
