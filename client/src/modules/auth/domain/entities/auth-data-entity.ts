import AuthInterface from "../interfaces/auth-interface";

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
}


