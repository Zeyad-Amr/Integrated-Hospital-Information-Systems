import LoginUserModel from '../models/login-user-model';
import { ApiClient, Endpoints } from "@/core/api";
import UserModel from '../models/user-model';

abstract class BaseAuthDataSource {
    abstract login(loginUser: LoginUserModel): Promise<boolean>;
    abstract getMe(): Promise<UserModel>;
}

class AuthDataSource extends BaseAuthDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async login(loginUser: LoginUserModel): Promise<boolean> {
        const response = await this.apiClient.post(Endpoints.user.login, loginUser.toJson());
        localStorage.setItem('token', response.data.access_token);
        return true;
    }

    override async getMe(): Promise<UserModel> {
        const response = await this.apiClient.get(Endpoints.user.me);
        return UserModel.fromJson(response.data);
    }

}

export { AuthDataSource, BaseAuthDataSource };