import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "./usecase-params";
import BaseAuthRepository from "../repositories/base-auth-repository";
import { AccountInterface } from "../interfaces/account-interface";

class GetMeUseCase
    implements BaseUseCase<AccountInterface, NoParams> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(): Promise<AccountInterface> {
        return await this.baseAuthRepository.getMe();
    }
}

export default GetMeUseCase;


