import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseVisitsRepository from "../../domain/repositories/base-visits-repository";
import VisitEntity from "../../domain/entities/visit-entity";
import VisitMapper from "../mappers/visit-mapper";
import { BaseVisitsDataSource } from "../datasources/visits-datasource";

class VisitsRepository extends BaseVisitsRepository {
    constructor(private baseVisitsDataSource: BaseVisitsDataSource) {
        super();
    }

    override async createVisit(visit: VisitEntity): Promise<VisitEntity> {
        try {
            console.log("Creating Visit");
            console.log(VisitMapper.entityToModel(visit));
            const result = await this.baseVisitsDataSource.createVisit(VisitMapper.entityToModel(visit));
            return VisitMapper.modelToEntity(result)
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async updateVisit(visit: VisitEntity): Promise<boolean> {
        try {
            await this.baseVisitsDataSource.updateVisit(VisitMapper.entityToModel(visit));
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllAnonymousVisits(): Promise<VisitEntity[]> {
        try {
            console.log("getAllAnonymousVisits");
            const result = await this.baseVisitsDataSource.getAllAnonymousVisits();
            console.log(result);
            return result.map((item) => VisitMapper.modelToEntity(item));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }


    override async getVisitByCode(visitcode: string): Promise<VisitEntity> {
        try {
            const result = await this.baseVisitsDataSource.getVisitByCode(visitcode);
            return VisitMapper.modelToEntity(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default VisitsRepository;