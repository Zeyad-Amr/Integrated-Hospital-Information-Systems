import { ApiClient, Endpoints, FilterQuery, PaginatedList, PaginatedListModel } from "@/core/api";
import SpecializationInterface from "../../domain/interfaces/specialization -interface";
import SpecializationModel from "../models/specialization-model";

abstract class BaseSpecializationDataSource {
    abstract createSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract updateSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract getAllSpecializations(filters: FilterQuery[]): Promise<PaginatedList<SpecializationInterface>>;
    abstract getSpecializationById(specializationId: string): Promise<SpecializationInterface>;
    abstract deleteSpecializationById(specializationId: string): Promise<boolean>;
}

class SpecializationDataSource extends BaseSpecializationDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createSpecialization(specialization: SpecializationInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.specialization.create, SpecializationModel.toJson(specialization));
        return response.data;
    }

    override async updateSpecialization(specialization: SpecializationInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.specialization.update, SpecializationModel.toJson(specialization), {
            pathVariables: { id: specialization.id },
        });
        return true;
    }

    override async getAllSpecializations(filters: FilterQuery[]): Promise<PaginatedList<SpecializationInterface>> {
        const response = await this.apiClient.get(Endpoints.specialization.list, { filters: filters });
        // TODO: Remove this line after the API is fixed
        response.data = {
            items: response.data,
            total: response.data.length,
            page: 1,
            size: 10
        }
        console.log(response.data);
        return PaginatedListModel.fromJson<SpecializationInterface>(response.data, response.data.items.map((item: any) => SpecializationModel.fromJson(item)));
    }

    override async getSpecializationById(id: string): Promise<SpecializationInterface> {
        const response = await this.apiClient.get(Endpoints.specialization.details, {
            pathVariables: { id: id },
        });
        return SpecializationModel.fromJson(response.data);
    }

    override async deleteSpecializationById(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.specialization.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { SpecializationDataSource, BaseSpecializationDataSource };