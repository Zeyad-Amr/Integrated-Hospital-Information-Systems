import { ApiClient, Endpoints } from "@/core/api";
import IncidentModel from "../models/incident-model";
import IncidentInterface from "../../domain/interfaces/incident-interface";

abstract class BaseIncidentDataSource {
    abstract createIncident(incident: IncidentInterface): Promise<IncidentInterface>;
    // abstract getAllIncidents(): Promise<IncidentInterface[]>;
    // abstract getIncidentById(incidentcode: string): Promise<IncidentInterface>;
}

class IncidentDataSource extends BaseIncidentDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createIncident(incident: IncidentInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.incident.create, IncidentModel.toJson(incident));
        console.log(response.data);
        return response.data;
    }

    // TODO
    // override async getAllIncidents(): Promise<IncidentInterface[]> {
    //     const response = await this.apiClient.get(Endpoints.incident.list, { filters: [FilterQuery.isNull('patientId')] });
    //     console.log(response.data.items);
    //     return response.data.items.map((item: any) => IncidentModel.fromJson(item));
    // }

    // override async getIncidentById(incidentcode: string): Promise<IncidentInterface> {
    //     const response = await this.apiClient.get(Endpoints.incident.details, {
    //         pathVariables: { incidentcode: incidentcode },
    //     });
    //     return IncidentModel.fromJson(response.data);
    // }

}

export { IncidentDataSource, BaseIncidentDataSource };