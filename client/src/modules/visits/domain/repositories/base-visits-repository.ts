import { ErrorResponse } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import AuthDataEntity from '../entities/visit-entity';
import UserEntity from "../entities/user-entity";
abstract class BaseAuthRepository {
    abstract login(authData: AuthDataEntity): Promise<Either<ErrorResponse, boolean>>;
    abstract getMe(): Promise<Either<ErrorResponse, UserEntity>>;
}

export default BaseAuthRepository;