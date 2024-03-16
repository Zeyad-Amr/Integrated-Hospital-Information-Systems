import { ErrorResponse, ErrorMessage } from "@/core/api";
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

    // TODO
    // override async getAllIncidents(): Promise<IncidentInterface[]> {
    //     try {
    //         const result = await this.baseIncidentDataSource.getAllIncidents();
    //         console.log(result);
    //         return result.map((item) => item);
    //     } catch (error) {
    //         const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
    //         throw errorResponse;
    //     }
    // }

    // override async getIncidentById(incidentcode: string): Promise<IncidentInterface> {
    //     try {
    //         const result = await this.baseIncidentDataSource.getIncidentById(incidentcode);
    //         return result;
    //     } catch (error) {
    //         const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
    //         throw errorResponse;
    //     }
    // }
}

export default IncidentRepository;