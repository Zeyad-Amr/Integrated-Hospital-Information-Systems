import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseLookupsRepository from '../../domain/repositories/base-lookups-repository';
import { LookupsInterface } from "../../domain/interfaces/lookups-interface";
import { BaseLookupsDataSource } from "../datasources/lookups-datasource";

class LookupsRepository extends BaseLookupsRepository {
    constructor(private baseLookupsDataSource: BaseLookupsDataSource) {
        super();
    }

    override async getLookups(): Promise<LookupsInterface> {
        try {
            console.log('Repo');
            const result = await this.baseLookupsDataSource.getLookups();
            console.log('Repo:', result);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default LookupsRepository;