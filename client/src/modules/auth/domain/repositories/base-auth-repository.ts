import { ErrorResponse } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import LoginUserEntity from '../entities/login-user-entity';
abstract class BaseAuthRepository {
    abstract login(userlogin: LoginUserEntity): Promise<Either<ErrorResponse, LoginUserEntity>>;
}

export default BaseAuthRepository;