import { ApiClient, Endpoints } from "@/core/api";
import VisitModel from '../models/visit-model';

abstract class BaseVisitsDataSource {
    abstract createVisit(visit: VisitModel): Promise<VisitModel>;
    abstract updateVisit(visit: VisitModel): Promise<boolean>;
    abstract getAllAnonymousVisits(): Promise<VisitModel[]>;
    abstract getVisitByCode(visitcode: string): Promise<VisitModel>;
}

class VisitsDataSource extends BaseVisitsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createVisit(visit: VisitModel): Promise<VisitModel> {
        const response = await this.apiClient.post(Endpoints.visit.create, visit.toJson());
        return VisitModel.fromJson(response.data);
    }

    override async updateVisit(visit: VisitModel): Promise<boolean> {
        await this.apiClient.patch(Endpoints.visit.update, visit.toJson());
        return true;
    }

    override async getAllAnonymousVisits(): Promise<VisitModel[]> {
        // TODO: Apply Filter to get only anonymous visits
        const response = await this.apiClient.get(Endpoints.visit.list);
        return response.data.items.map((item: any) => VisitModel.fromJson(item));
    }

    override async getVisitByCode(visitcode: string): Promise<VisitModel> {
        const response = await this.apiClient.get(Endpoints.visit.details, {
            pathVariables: { visitcode: visitcode },
        });
        return VisitModel.fromJson(response.data);
    }

}

export { VisitsDataSource, BaseVisitsDataSource };