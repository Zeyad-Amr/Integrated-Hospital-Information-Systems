import { ErrorResponse } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import LoginUserEntity from '../entities/login-user-entity';
import UserEntity from "../entities/user-entity";
abstract class BaseAuthRepository {
    abstract login(loginUser: LoginUserEntity): Promise<Either<ErrorResponse, boolean>>;
    abstract getMe(): Promise<Either<ErrorResponse, UserEntity>>;
}

export default BaseAuthRepository;