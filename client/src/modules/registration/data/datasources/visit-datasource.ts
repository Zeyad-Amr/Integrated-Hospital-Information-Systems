import { ApiClient, Endpoints, FilterQuery } from "@/core/api";
import VisitModel from "../models/visit-model";
import VisitInterface from "../../domain/interfaces/visit-interface";
import Filter from "@/core/api/filters";

abstract class BaseVisitDataSource {
    abstract createVisit(visit: VisitInterface): Promise<VisitInterface>;
    abstract updateVisit(visit: VisitInterface): Promise<boolean>;
    abstract getAllAnonymousVisits(filters: FilterQuery[]): Promise<VisitInterface[]>;
    abstract getVisitByCode(visitcode: string): Promise<VisitInterface>;
}

class VisitDataSource extends BaseVisitDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createVisit(visit: VisitInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.visit.create, VisitModel.toJson(visit));
        console.log(response.data);
        return response.data;
    }

    override async updateVisit(visit: VisitInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.visit.update, VisitModel.toUpdateJson(visit));
        return true;
    }

    override async getAllAnonymousVisits(filters: FilterQuery[]): Promise<VisitInterface[]> {
        console.log("getAllAnonymousVisits DS");
        const response = await this.apiClient.get(Endpoints.visit.list, { filters: [Filter.isNotNull('patientId'), ...filters] });
        console.log(response.data.items);
        return response.data.items.map((item: any) => VisitModel.fromJson(item));
    }

    override async getVisitByCode(visitcode: string): Promise<VisitInterface> {
        const response = await this.apiClient.get(Endpoints.visit.details, {
            pathVariables: { visitcode: visitcode },
        });
        return VisitModel.fromJson(response.data);
    }

}

export { VisitDataSource, BaseVisitDataSource };