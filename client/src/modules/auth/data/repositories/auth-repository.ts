import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseAuthRepository from "../../domain/repositories/base-auth-repository";
import { BaseAuthDataSource } from "../datasources/auth-datasource";
import AuthInterface from "../../domain/interfaces/auth-interface";
import { AccountInterface } from "../../domain/interfaces/account-interface";

class AuthRepository extends BaseAuthRepository {
    constructor(private baseAuthDataSource: BaseAuthDataSource) {
        super();
    }

    override async login(authData: AuthInterface): Promise<boolean> {
        try {
            const result = await this.baseAuthDataSource.login(authData);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getMe(): Promise<AccountInterface> {
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