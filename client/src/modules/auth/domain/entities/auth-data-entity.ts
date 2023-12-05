import AuthInterface from "../interfaces/auth-interface";

export default class AuthDataEntity implements AuthInterface {
    private _username: string;
    private _password: string;

    constructor(data: AuthInterface) {
        this._username = data.username;
        this._password = data.password;
    }

    //* --------------------- Getters ---------------------
    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    //* --------------------- Setters ---------------------
    set username(username: string) {
        this.username = username;
    }

    set password(password: string) {
        this.password = password;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): AuthInterface {
        return {
            username: '',
            password: '',
        };
    }
}


