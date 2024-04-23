import { ApiClient, Endpoints } from "@/core/api";
import SpecializationInterface from "../../domain/interfaces/specialization -interface";
import SpecializationModel from "../models/specialization-model";

abstract class BaseSpecializationDataSource {
    abstract createSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract updateSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract getAllSpecializations(): Promise<SpecializationInterface[]>;
    abstract getSpecializationById(specializationId: string): Promise<SpecializationInterface>;
    abstract deleteSpecializationById(specializationId: string): Promise<boolean>;
}

class SpecializationDataSource extends BaseSpecializationDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createSpecialization(specialization : SpecializationInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.specialization.create, SpecializationModel.toJson(specialization));
        return response.data;
    }

    override async updateSpecialization(specialization : SpecializationInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.specialization.update, SpecializationModel.toJson(specialization) , {
            pathVariables: { id: specialization.id },
        } );
        return true;
    }

    override async getAllSpecializations(): Promise<SpecializationInterface[]> {
        const response = await this.apiClient.get(Endpoints.specialization.list);
        console.log(response.data);
        return response.data.map((specialization: any) => SpecializationModel.fromJson(specialization));
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