export default class AuthDataEntity {
    private _username: string;
    private _password: string;

    constructor(data: {
        username: string;
        password: string;
    }) {
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
    static defaultValue(): AuthDataEntity {
        return new AuthDataEntity({
            username: '',
            password: '',
        });
    }
}


