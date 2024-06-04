import { AccountInterface } from '../interfaces/account-interface';
import AuthInterface from '../interfaces/auth-interface';
abstract class BaseAuthRepository {
    abstract login(authData: AuthInterface): Promise<boolean>;
    abstract getMe(): Promise<AccountInterface>;
}

export default BaseAuthRepository;