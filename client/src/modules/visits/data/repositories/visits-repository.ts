import { ErrorResponse, ErrorMessage } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import BaseVisitsRepository from "../../domain/repositories/base-visits-repository";
import VisitEntity from "../../domain/entities/visit-entity";
import VisitMapper from "../mappers/visit-mapper";
import { BaseVisitsDataSource } from "../datasources/visits-datasource";

class VisitsRepository extends BaseVisitsRepository {
    constructor(private baseVisitsDataSource: BaseVisitsDataSource) {
        super();
    }

    override async createVisit(visit: VisitEntity): Promise<Either<ErrorResponse, VisitEntity>> {
        try {
            const result = await this.baseVisitsDataSource.createVisit(VisitMapper.entityToModel(visit));
            return Either.right(VisitMapper.modelToEntity(result));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    override async updateVisit(visit: VisitEntity): Promise<Either<ErrorResponse, boolean>> {
        try {
            await this.baseVisitsDataSource.updateVisit(VisitMapper.entityToModel(visit));
            return Either.right(true);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    override async getAllAnonymousVisits(): Promise<Either<ErrorResponse, VisitEntity[]>> {
        try {
            const result = await this.baseVisitsDataSource.getAllAnonymousVisits();
            return Either.right(result.map((item) => VisitMapper.modelToEntity(item)));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }


    override async getVisitByCode(visitcode: string): Promise<Either<ErrorResponse, VisitEntity>> {
        try {
            const result = await this.baseVisitsDataSource.getVisitByCode(visitcode);
            return Either.right(VisitMapper.modelToEntity(result));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
}

export default VisitsRepository;