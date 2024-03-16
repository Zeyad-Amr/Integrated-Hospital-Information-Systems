import { ApiClient, Endpoints, FilterQueryParam } from "@/core/api";
import RegistrationModel from "../models/visit-model";
import VisitInterface from "../../domain/interfaces/visit-interface";
import APIFilter from "@/core/api/filters";

abstract class BaseRegistrationDataSource {
    abstract createVisit(visit: VisitInterface): Promise<VisitInterface>;
    abstract updateVisit(visit: VisitInterface): Promise<boolean>;
    abstract getAllAnonymousVisits(filters: FilterQueryParam[]): Promise<VisitInterface[]>;
    abstract getVisitByCode(visitcode: string): Promise<VisitInterface>;
}

class RegistrationDataSource extends BaseRegistrationDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createVisit(visit: VisitInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.visit.create, RegistrationModel.toJson(visit));
        console.log(response.data);
        return response.data;
    }

    override async updateVisit(visit: VisitInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.visit.update, RegistrationModel.toUpdateJson(visit));
        return true;
    }

    override async getAllAnonymousVisits(filters: FilterQueryParam[]): Promise<VisitInterface[]> {
        console.log("getAllAnonymousVisits DS");
        const response = await this.apiClient.get(Endpoints.visit.list, { filters: [APIFilter.isNotNull('patientId'), ...filters] });
        console.log(response.data.items);
        return response.data.items.map((item: any) => RegistrationModel.fromJson(item));
    }

    override async getVisitByCode(visitcode: string): Promise<VisitInterface> {
        const response = await this.apiClient.get(Endpoints.visit.details, {
            pathVariables: { visitcode: visitcode },
        });
        return RegistrationModel.fromJson(response.data);
    }

}

export { RegistrationDataSource, BaseRegistrationDataSource };