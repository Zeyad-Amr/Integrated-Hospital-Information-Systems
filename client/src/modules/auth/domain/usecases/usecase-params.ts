import AuthDataEntity from "../entities/auth-data-entity";

class LoginUseCaseParameters {
    constructor(public authData: AuthDataEntity) { }
}

class NoParams { }

export {
    LoginUseCaseParameters, NoParams
};
