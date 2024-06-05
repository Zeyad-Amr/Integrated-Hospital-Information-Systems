import { ApiClient, Endpoints, FilterQuery, PaginatedList, PaginatedListModel } from "@/core/api";
import IncidentModel from "../models/incident-model";
import IncidentInterface from "../../domain/interfaces/incident-interface";

abstract class BaseIncidentDataSource {
    abstract createIncident(incident: IncidentInterface): Promise<IncidentInterface>;
    abstract getAllIncidents(filters: FilterQuery[]): Promise<PaginatedList<IncidentInterface>>;
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


    override async getAllIncidents(filters: FilterQuery[]): Promise<PaginatedList<IncidentInterface>> {
        console.log("getAllIncidents DS:", filters);
        const response = await this.apiClient.get(Endpoints.incident.list, { filters: filters });
        console.log(response.data.items);
        return PaginatedListModel.fromJson<IncidentInterface>(response.data, response.data.items.map((item: any) => IncidentModel.fromJson(item)), filters);
    }

}

export { IncidentDataSource, BaseIncidentDataSource };