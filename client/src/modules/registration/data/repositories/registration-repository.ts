import { ErrorResponse, ErrorMessage, FilterQueryParam } from "@/core/api";
import BaseRegistrationRepository from "../../domain/repositories/base-registration-repository";
import { BaseRegistrationDataSource } from "../datasources/registration-datasource";
import VisitInterface from "../../domain/interfaces/visit-interface";

class RegistrationRepository extends BaseRegistrationRepository {
    constructor(private baseRegistrationDataSource: BaseRegistrationDataSource) {
        super();
    }

    override async createVisit(visit: VisitInterface): Promise<VisitInterface> {
        try {
            const result = await this.baseRegistrationDataSource.createVisit(visit);
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
            await this.baseRegistrationDataSource.updateVisit(visit);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllAnonymousVisits(filters: FilterQueryParam[]): Promise<VisitInterface[]> {
        try {
            console.log("getAllAnonymousVisits");
            const result = await this.baseRegistrationDataSource.getAllAnonymousVisits(filters);
            console.log(result);
            return result.map((item) => item);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getVisitByCode(visitcode: string): Promise<VisitInterface> {
        try {
            const result = await this.baseRegistrationDataSource.getVisitByCode(visitcode);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default RegistrationRepository;