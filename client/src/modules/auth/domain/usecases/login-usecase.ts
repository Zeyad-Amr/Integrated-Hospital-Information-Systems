import BaseUseCase from "@/core/base/base-usecase";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import { LoginUseCaseParameters } from "./usecase-params";
import BaseAuthRepository from "../repositories/base-auth-repository";

class LoginUseCase
    implements BaseUseCase<boolean, LoginUseCaseParameters> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(param: LoginUseCaseParameters): Promise<Either<ErrorMessage, boolean>> {
        return await this.baseAuthRepository.login(param.loginUser);
    }
}

export default LoginUseCase;


