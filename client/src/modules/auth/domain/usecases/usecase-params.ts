import LoginUserEntity from "../entities/login-user-entity";

class LoginUseCaseParameters {
    constructor(public loginUser: LoginUserEntity) { }
}

class NoParams { }

export {
    LoginUseCaseParameters, NoParams
};
