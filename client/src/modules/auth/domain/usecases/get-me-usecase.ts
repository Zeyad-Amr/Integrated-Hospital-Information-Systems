import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "./usecase-params";
import BaseAuthRepository from "../repositories/base-auth-repository";
import UserInterface from "../interfaces/user-interface";

class GetMeUseCase
    implements BaseUseCase<UserInterface, NoParams> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(): Promise<UserInterface> {
        return await this.baseAuthRepository.getMe();
    }
}

export default GetMeUseCase;


