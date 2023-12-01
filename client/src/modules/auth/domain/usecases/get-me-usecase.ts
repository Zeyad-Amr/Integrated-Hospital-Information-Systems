import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "./usecase-params";
import BaseAuthRepository from "../repositories/base-auth-repository";
import UserEntity from "../entities/user-entity";

class GetMeUseCase
    implements BaseUseCase<UserEntity, NoParams> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(): Promise<UserEntity> {
        return await this.baseAuthRepository.getMe();
    }
}

export default GetMeUseCase;


