import { ErrorResponse, ErrorMessage, FilterQuery } from "@/core/api";
import BaseVisitRepository from "../../domain/repositories/base-visit-repository";
import { BaseVisitDataSource } from "../datasources/visit-datasource";
import VisitInterface from "../../domain/interfaces/visit-interface";

class VisitRepository extends BaseVisitRepository {
    constructor(private baseVisitDataSource: BaseVisitDataSource) {
        super();
    }

    override async createVisit(visit: VisitInterface): Promise<VisitInterface> {
        try {
            const result = await this.baseVisitDataSource.createVisit(visit);
            return result;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateVisit(visit: VisitInterface): Promise<boolean> {
        try {
            await this.baseVisitDataSource.updateVisit(visit);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllAnonymousVisits(filters: FilterQuery[]): Promise<VisitInterface[]> {
        try {
            console.log("getAllAnonymousVisits");
            const result = await this.baseVisitDataSource.getAllAnonymousVisits(filters);
            console.log(result);
            return result.map((item) => item);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getVisitByCode(visitcode: string): Promise<VisitInterface> {
        try {
            const result = await this.baseVisitDataSource.getVisitByCode(visitcode);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default VisitRepository;