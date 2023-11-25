import BaseUseCase from "@/core/base/base-usecase";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import { NoParams } from "./usecase-params";
import BaseAuthRepository from "../repositories/base-reception-repository";
import UserEntity from "../entities/user-entity";

class GetMeUseCase
    implements BaseUseCase<UserEntity, NoParams> {
    constructor(private baseAuthRepository: BaseAuthRepository) { }

    async call(): Promise<Either<ErrorMessage, UserEntity>> {
        return await this.baseAuthRepository.getMe();
    }
}

export default GetMeUseCase;


