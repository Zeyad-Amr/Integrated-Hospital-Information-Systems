import AuthInterface from '../interfaces/auth-interface';
import UserInterface from '../interfaces/user-interface';
abstract class BaseAuthRepository {
    abstract login(authData: AuthInterface): Promise<boolean>;
    abstract getMe(): Promise<UserInterface>;
}

export default BaseAuthRepository;