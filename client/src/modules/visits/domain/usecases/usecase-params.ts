import AuthDataEntity from "../entities/visit-entity";

class LoginUseCaseParameters {
    constructor(public authData: AuthDataEntity) { }
}

class NoParams { }

export {
    LoginUseCaseParameters, NoParams
};
