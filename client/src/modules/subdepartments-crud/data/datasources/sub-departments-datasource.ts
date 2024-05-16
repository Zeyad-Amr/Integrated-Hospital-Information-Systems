import { ApiClient, Endpoints } from "@/core/api";
import {SubDepartmentsAssignFeaturesInterface, SubDepartmentsInterface} from "../../domain/interfaces/sub-departments-interface";
import SubDepartmentsModel from "../models/sub-departments";

abstract class BaseSubDepartmentsDataSource {
    abstract createSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentsAssignFeaturesInterface): Promise<boolean>;
    abstract getAllSubDepartments(): Promise<SubDepartmentsInterface[]>;
    abstract getSubDepartmentById(subDepartmentId: string): Promise<SubDepartmentsInterface>;
    abstract deleteSubDepartmentById(subDepartmentId: string): Promise<boolean>;
}

class SubDepartmentsDataSource extends BaseSubDepartmentsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createSubDepartment(subDepartment : SubDepartmentsInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.subdepartment.create, SubDepartmentsModel.toJson(subDepartment));
        return response.data;
    }

    override async updateSubDepartment(subDepartment : SubDepartmentsInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.subdepartment.update, SubDepartmentsModel.toJson(subDepartment) , {
            pathVariables: { id: subDepartment.id },
        } );
        return true;
    }

    override async updateSubDepartmentAssignFeature(assignFeatures : SubDepartmentsAssignFeaturesInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.subdepartment.updateAssignFeatures, SubDepartmentsModel.assignFeaturesToJson(assignFeatures) , {
            pathVariables: { id: assignFeatures.id },
        } );
        return true;
    }

    override async getAllSubDepartments(): Promise<SubDepartmentsInterface[]> {
        const response = await this.apiClient.get(Endpoints.subdepartment.list);
        console.log(response.data,'getAllSubDepartments');
        return response.data.map((subDepartment: any) => SubDepartmentsModel.fromJson(subDepartment));
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