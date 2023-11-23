import { ErrorResponse, ErrorMessage } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import BaseAuthRepository from "../../domain/repositories/base-auth-repository";
import { BaseAuthDataSource } from "../datasources/auth-datasource";
import LoginUserEntity from "../../domain/entities/login-user-entity";
import LoginUserMapper from "../mappers/login-user-mapper";
import UserEntity from "../../domain/entities/user-entity";

class AuthRepository extends BaseAuthRepository {
    constructor(private baseAuthDataSource: BaseAuthDataSource) {
        super();
    }

    override async login(loginUser: LoginUserEntity): Promise<Either<ErrorResponse, boolean>> {
        try {
            const result = await this.baseAuthDataSource.login(LoginUserMapper.entityToModel(loginUser));
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    override async getMe(): Promise<Either<ErrorResponse, UserEntity>> {
        try {
            const result = await this.baseAuthDataSource.getMe();
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
}

export default AuthRepository;