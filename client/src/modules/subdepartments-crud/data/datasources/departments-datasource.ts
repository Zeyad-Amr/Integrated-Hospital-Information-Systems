import { ApiClient, Endpoints } from "@/core/api";
import DepartmentsInterface from "../../domain/interfaces/departments-interface";
import DepartmentsModel from "../models/departments-model";

abstract class BaseDepartmentsDataSource {
    abstract getAllDepartments(): Promise<DepartmentsInterface[]>;
}

class DepartmentsDataSource extends BaseDepartmentsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async getAllDepartments(): Promise<DepartmentsInterface[]> {
        const response = await this.apiClient.get(Endpoints.department.list);
        console.log(response.data,'getAllDepartments');
        return response.data.map((department: any) => DepartmentsModel.fromJson(department));
    }

}

export { DepartmentsDataSource, BaseDepartmentsDataSource };