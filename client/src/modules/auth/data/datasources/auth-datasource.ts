import LoginUserModel from '../models/login-user-model';
import { ApiClient, Endpoints } from "@/core/api";

abstract class BaseAuthDataSource {
    abstract login(loginUser: LoginUserModel): Promise<LoginUserModel>;
}

class AuthDataSource extends BaseAuthDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async login(loginUser: LoginUserModel): Promise<LoginUserModel> {
        const response = await this.apiClient.post(Endpoints.user.login, loginUser.toJson());
        return LoginUserModel.fromJson(response.data);
    }

}

export { AuthDataSource, BaseAuthDataSource };