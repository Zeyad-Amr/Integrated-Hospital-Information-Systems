export default class LoginUserEntity {
    private _username: string;
    private _password: string;

    constructor(data: {
        username: string;
        password: string;
    }) {
        this._username = data.username;
        this._password = data.password;
    }

    // Getter methods using property accessors
    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    // Setter methods using property accessors
    set username(username: string) {
        this.username = username;
    }

    set password(password: string) {
        this.password = password;
    }

}
