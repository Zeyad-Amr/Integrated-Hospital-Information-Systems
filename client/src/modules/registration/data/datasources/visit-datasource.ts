import { ApiClient, Endpoints, FilterQuery, PaginatedList } from "@/core/api";
import VisitModel from "../models/visit-model";
import VisitInterface from "../../domain/interfaces/visit-interface";
import Filter from "@/core/api/filters";
import { PaginatedListModel } from "@/core/api/pagination";
import { CompleteVisitInterface } from "../../domain/interfaces/complete-visit-interface";

abstract class BaseVisitDataSource {
    abstract createVisit(visit: VisitInterface): Promise<VisitInterface>;
    abstract updateVisit(visit: VisitInterface): Promise<boolean>;
    abstract getAllAnonymousVisits(filters: FilterQuery[]): Promise<PaginatedList<VisitInterface>>;
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

    override async updateVisit(data: CompleteVisitInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.visit.update, VisitModel.toUpdateJson(data));
        return true;
    }

    override async getAllAnonymousVisits(filters: FilterQuery[]): Promise<PaginatedList<VisitInterface>> {
        console.log("getAllAnonymousVisits DS:", filters);
        const response = await this.apiClient.get(Endpoints.visit.list, { filters: [Filter.isNotNull('patientId'), ...filters] });
        console.log(response.data.items);
        return PaginatedListModel.fromJson<VisitInterface>(response.data, response.data.items.map((item: any) => VisitModel.fromJson(item)), filters);
    }

    override async getVisitByCode(visitcode: string): Promise<VisitInterface> {
        const response = await this.apiClient.get(Endpoints.visit.details, {
            pathVariables: { visitcode: visitcode },
        });
        return VisitModel.fromJson(response.data);
    }

}

export { VisitDataSource, BaseVisitDataSource };