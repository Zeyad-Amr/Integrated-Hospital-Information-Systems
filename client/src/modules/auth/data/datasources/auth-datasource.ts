import AuthDataModel from '../models/auth-data-model';
import { ApiClient, Endpoints } from "@/core/api";
import UserModel from '../models/user-model';
import { LocalStorage, LocalStorageKeys } from '@/core/shared/utils/local-storage';

abstract class BaseAuthDataSource {
    abstract login(authData: AuthDataModel): Promise<boolean>;
    abstract getMe(): Promise<UserModel>;
}

class AuthDataSource extends BaseAuthDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async login(authData: AuthDataModel): Promise<boolean> {
        const response = await this.apiClient.post(Endpoints.user.login, authData.toJson());
        // localStorage.setItem('token', response.data.access_token);
        LocalStorage.store<string>(LocalStorageKeys.token, response.data.access_token);
        return true;
    }

    override async getMe(): Promise<UserModel> {
        const response = await this.apiClient.get(Endpoints.user.me);
        return UserModel.fromJson(response.data);
    }

}

export { AuthDataSource, BaseAuthDataSource };