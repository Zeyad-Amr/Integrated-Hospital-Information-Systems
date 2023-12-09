import AuthInterface from "../interfaces/auth-interface";

class LoginUseCaseParameters {
    constructor(public authData: AuthInterface) { }
}

class NoParams { }

export {
    LoginUseCaseParameters, NoParams
};
