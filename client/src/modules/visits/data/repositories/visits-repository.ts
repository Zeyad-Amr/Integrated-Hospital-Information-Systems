import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseVisitsRepository from "../../domain/repositories/base-visits-repository";
import VisitMapper from "../mappers/visit-mapper";
import { BaseVisitsDataSource } from "../datasources/visits-datasource";
import VisitInterface from "../../domain/interfaces/visit-interface";

class VisitsRepository extends BaseVisitsRepository {
    constructor(private baseVisitsDataSource: BaseVisitsDataSource) {
        super();
    }

    override async createVisit(visit: VisitInterface): Promise<VisitInterface> {
        try {
            console.log("Creating Visit");
            console.log('VR', VisitMapper.toModel(visit));
            const result = await this.baseVisitsDataSource.createVisit(VisitMapper.toModel(visit));
            console.log(VisitMapper.fromModel(result));
            return VisitMapper.fromModel(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateVisit(visit: VisitInterface): Promise<boolean> {
        try {
            await this.baseVisitsDataSource.updateVisit(VisitMapper.toModel(visit));
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllAnonymousVisits(): Promise<VisitInterface[]> {
        try {
            console.log("getAllAnonymousVisits");
            const result = await this.baseVisitsDataSource.getAllAnonymousVisits();
            console.log(result);
            return result.map((item) => VisitMapper.fromModel(item));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getVisitByCode(visitcode: string): Promise<VisitInterface> {
        try {
            const result = await this.baseVisitsDataSource.getVisitByCode(visitcode);
            return VisitMapper.fromModel(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default VisitsRepository;