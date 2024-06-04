import AuthDataModel from '../models/auth-data-model';
import { ApiClient, Endpoints } from "@/core/api";
import AuthInterface from '../../domain/interfaces/auth-interface';
import { SessionStorage, SessionStorageKeys } from '@/core/shared/utils/session-storage';
import { AccountInterface } from '../../domain/interfaces/account-interface';
import AccountModel from '../models/account-model';

abstract class BaseAuthDataSource {
    abstract login(authData: AuthInterface): Promise<boolean>;
    abstract getMe(): Promise<AccountInterface>;
}

class AuthDataSource extends BaseAuthDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async login(authData: AuthInterface): Promise<boolean> {
        try {
            const response = await this.apiClient.post(Endpoints.user.login, AuthDataModel.toJson(authData));
            SessionStorage.saveData(SessionStorageKeys.userData, response.data)
            SessionStorage.saveData(SessionStorageKeys.token, response.data['access_token'])
            return true;
        } catch (error) {
            SessionStorage.clearAll();
            throw error;
        }
    }

    override async getMe(): Promise<AccountInterface> {
        try {
            const response = await this.apiClient.get(Endpoints.user.me);
            const user = AccountModel.fromJson(response.data);
            return user;
        } catch (error) {
            throw error;
        }
    }

}

export { AuthDataSource, BaseAuthDataSource };