import { ErrorResponse, ErrorMessage } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import BaseAuthRepository from "../../domain/repositories/base-reception-repository";
import { BaseAuthDataSource } from "../datasources/reception-datasource";
import AuthDataEntity from "../../domain/entities/auth-data-entity";
import AuthDataMapper from "../mappers/login-user-mapper";
import UserEntity from "../../domain/entities/user-entity";

class AuthRepository extends BaseAuthRepository {
    constructor(private baseAuthDataSource: BaseAuthDataSource) {
        super();
    }

    override async login(authData: AuthDataEntity): Promise<Either<ErrorResponse, boolean>> {
        try {
            const result = await this.baseAuthDataSource.login(AuthDataMapper.entityToModel(authData));
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