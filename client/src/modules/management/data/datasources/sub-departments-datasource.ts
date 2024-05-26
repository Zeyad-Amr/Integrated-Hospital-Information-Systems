import { ApiClient, Endpoints, FilterQuery, PaginatedList, PaginatedListModel } from "@/core/api";
import { SubDepartmentsAssignFeaturesInterface, SubDepartmentsInterface } from "../../domain/interfaces/sub-departments-interface";
import SubDepartmentsModel from "../models/sub-departments";

abstract class BaseSubDepartmentsDataSource {
    abstract createSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentsAssignFeaturesInterface): Promise<boolean>;
    abstract getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentsInterface>>;
    abstract getSubDepartmentById(subDepartmentId: string): Promise<SubDepartmentsInterface>;
    abstract deleteSubDepartmentById(subDepartmentId: string): Promise<boolean>;
}

class SubDepartmentsDataSource extends BaseSubDepartmentsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createSubDepartment(subDepartment: SubDepartmentsInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.subdepartment.create, SubDepartmentsModel.toJson(subDepartment));
        return response.data;
    }

    override async updateSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.subdepartment.update, SubDepartmentsModel.toJson(subDepartment), {
            pathVariables: { id: subDepartment.id },
        });
        return true;
    }

    override async updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentsAssignFeaturesInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.subdepartment.updateAssignFeatures, SubDepartmentsModel.assignFeaturesToJson(assignFeatures), {
            pathVariables: { id: assignFeatures.id },
        });
        return true;
    }

    override async getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentsInterface>> {
        const response = await this.apiClient.get(Endpoints.subdepartment.list, { filters: filters });
        // TODO: Remove this line after the API is fixed
        response.data = {
            items: response.data,
            total: response.data.length,
            page: 1,
            size: 10
        }
        console.log(response.data, 'getAllSubDepartments');
        return PaginatedListModel.fromJson<SubDepartmentsInterface>(response.data, response.data.items.map((item: any) => SubDepartmentsModel.fromJson(item)));
    }

    override async getSubDepartmentById(id: string): Promise<SubDepartmentsInterface> {
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