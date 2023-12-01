import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseAuthRepository from "../../domain/repositories/base-auth-repository";
import { BaseAuthDataSource } from "../datasources/auth-datasource";
import AuthDataMapper from "../mappers/login-user-mapper";
import UserInterface from "../../domain/interfaces/user-interface";
import AuthInterface from "../../domain/interfaces/auth-interface";

class AuthRepository extends BaseAuthRepository {
    constructor(private baseAuthDataSource: BaseAuthDataSource) {
        super();
    }

    override async login(authData: AuthInterface): Promise<boolean> {
        try {
            const result = await this.baseAuthDataSource.login(AuthDataMapper.toModel(authData));
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getMe(): Promise<UserInterface> {
        try {
            const result = await this.baseAuthDataSource.getMe();
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default AuthRepository;