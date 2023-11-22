import { ErrorResponse, ErrorMessage } from "@/core/api";
import { Either } from "@/core/shared/utils/either";

import StaffEntity from '../../domain/entities/login-user-entity';
import StaffMapper from "../mappers/login-user-mapper";
import BaseAuthRepository from "../../domain/repositories/base-auth-repository";
import { BaseAuthDataSource } from "../datasources/auth-datasource";

class AuthRepository extends BaseAuthRepository {
    constructor(private baseAuthDataSource: BaseAuthDataSource) {
        super();
    }

    override async login(staff: StaffEntity): Promise<Either<ErrorResponse, StaffEntity>> {
        try {
            const result = await this.baseAuthDataSource.login(StaffMapper.entityToModel(staff));
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
}

export default AuthRepository;