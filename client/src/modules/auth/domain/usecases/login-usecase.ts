import BaseUseCase from "@/core/base/base-usecase";
import { LoginUseCaseParameters } from "./usecase-params";
import BaseAuthRepository from "../repositories/base-auth-repository";

class LoginUseCase
    implements BaseUseCase<boolean, LoginUseCaseParameters> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(param: LoginUseCaseParameters): Promise<boolean> {
        return await this.baseAuthRepository.login(param.authData);
    }
}

export default LoginUseCase;


