import BaseUseCase from "@/core/base/base-usecase";
import BaseAuthRepository from "../repositories/base-auth-repository";
import AuthInterface from "../interfaces/auth-interface";

class LoginUseCase
    implements BaseUseCase<boolean, AuthInterface> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(param: AuthInterface): Promise<boolean> {
        return await this.baseAuthRepository.login(param);
    }
}

export default LoginUseCase;


