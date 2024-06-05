import { ErrorResponse, ErrorMessage, FilterQuery, PaginatedList } from "@/core/api";
import BaseIncidentRepository from "../../domain/repositories/base-incident-repository";
import { BaseIncidentDataSource } from "../datasources/incident-datasource";
import IncidentInterface from "../../domain/interfaces/incident-interface";

class IncidentRepository extends BaseIncidentRepository {
    constructor(private baseIncidentDataSource: BaseIncidentDataSource) {
        super();
    }

    override async createIncident(incident: IncidentInterface): Promise<IncidentInterface> {
        try {
            const result = await this.baseIncidentDataSource.createIncident(incident);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllIncidents(filters: FilterQuery[]): Promise<PaginatedList<IncidentInterface>> {
        try {
            console.log("getAllIncidents");
            const result = await this.baseIncidentDataSource.getAllIncidents(filters);
            console.log(result);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default IncidentRepository;