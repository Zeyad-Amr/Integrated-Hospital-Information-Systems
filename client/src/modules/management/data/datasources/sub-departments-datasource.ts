import { ApiClient, Endpoints, FilterQuery, PaginatedList, PaginatedListModel } from "@/core/api";
import { SubDepartmentAssignFeaturesInterface, SubDepartmentInterface } from "../../domain/interfaces/sub-departments-interface";
import SubDepartmentsModel from "../models/sub-departments";

abstract class BaseSubDepartmentsDataSource {
    abstract createSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean>;
    abstract updateSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean>;
    abstract updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentAssignFeaturesInterface): Promise<boolean>;
    abstract getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentInterface>>;
    abstract getSubDepartmentById(subDepartmentId: string): Promise<SubDepartmentInterface>;
    abstract deleteSubDepartmentById(subDepartmentId: string): Promise<boolean>;
}

class SubDepartmentsDataSource extends BaseSubDepartmentsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createSubDepartment(subDepartment: SubDepartmentInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.subdepartment.create, SubDepartmentsModel.toJson(subDepartment));
        return response.data;
    }

    override async updateSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.subdepartment.update, SubDepartmentsModel.toJson(subDepartment), {
            pathVariables: { id: subDepartment.id },
        });
        return true;
    }

    override async updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentAssignFeaturesInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.subdepartment.updateAssignFeatures, SubDepartmentsModel.assignFeaturesToJson(assignFeatures), {
            pathVariables: { id: assignFeatures.id },
        });
        return true;
    }

    override async getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentInterface>> {
        const response = await this.apiClient.get(Endpoints.subdepartment.list, { filters: filters });
        console.log(response.data, 'getAllSubDepartments');
        return PaginatedListModel.fromJson<SubDepartmentInterface>(response.data, response.data.items.map((item: any) => SubDepartmentsModel.fromJson(item)), filters);
    }

    override async getSubDepartmentById(id: string): Promise<SubDepartmentInterface> {
        const response = await this.apiClient.get(Endpoints.subdepartment.details, {
            pathVariables: { id: id },
        });
        return SubDepartmentsModel.fromJson(response.data);
    }

    override async deleteSubDepartmentById(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.subdepartment.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { SubDepartmentsDataSource, BaseSubDepartmentsDataSource };