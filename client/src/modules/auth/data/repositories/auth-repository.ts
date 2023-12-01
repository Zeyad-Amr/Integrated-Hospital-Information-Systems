import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseAuthRepository from "../../domain/repositories/base-auth-repository";
import { BaseAuthDataSource } from "../datasources/auth-datasource";
import AuthDataEntity from "../../domain/entities/auth-data-entity";
import AuthDataMapper from "../mappers/login-user-mapper";
import UserEntity from "../../domain/entities/user-entity";

class AuthRepository extends BaseAuthRepository {
    constructor(private baseAuthDataSource: BaseAuthDataSource) {
        super();
    }

    override async login(authData: AuthDataEntity): Promise<boolean> {
        try {
            const result = await this.baseAuthDataSource.login(AuthDataMapper.entityToModel(authData));
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getMe(): Promise<UserEntity> {
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