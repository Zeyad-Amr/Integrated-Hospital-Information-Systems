import AuthDataEntity from '../entities/auth-data-entity';
import UserEntity from "../entities/user-entity";
abstract class BaseAuthRepository {
    abstract login(authData: AuthDataEntity): Promise<boolean>;
    abstract getMe(): Promise<UserEntity>;
}

export default BaseAuthRepository;