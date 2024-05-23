import AuthDataModel from '../models/auth-data-model';
import { ApiClient, Endpoints } from "@/core/api";
import UserModel from '../models/user-model';
import { LocalStorage, LocalStorageKeys } from '@/core/shared/utils/local-storage';
import AuthInterface from '../../domain/interfaces/auth-interface';
import UserInterface from '../../domain/interfaces/user-interface';
import { SessionStorage, SessionStorageKeys } from '@/core/shared/utils/session-storage';

abstract class BaseAuthDataSource {
    abstract login(authData: AuthInterface): Promise<boolean>;
    abstract getMe(): Promise<UserInterface>;
}

class AuthDataSource extends BaseAuthDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async login(authData: AuthInterface): Promise<boolean> {
        try {
            const response = await this.apiClient.post(Endpoints.user.login, AuthDataModel.toJson(authData));
            SessionStorage.saveData(SessionStorageKeys.userData, response.data)
            return true;
        } catch (error) {
            SessionStorage.clearAll();
            throw error;
        }
    }

    override async getMe(): Promise<UserInterface> {
        try {
            const response = await this.apiClient.get(Endpoints.user.me);
            const user = UserModel.fromJson(response.data);
            return user;
        } catch (error) {
            throw error;
        }
    }

}

export { AuthDataSource, BaseAuthDataSource };