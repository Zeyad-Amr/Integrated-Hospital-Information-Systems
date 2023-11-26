import AuthDataModel from '@/modules/auth/data/models/auth-data-model';
import EmployeeModel from '../models/employee-model';
import { ApiClient, Endpoints } from "@/core/api";

abstract class BaseEmployeeDataSource {
    abstract getEmployeeById(id: string): Promise<EmployeeModel>;
    abstract getAllEmployees(): Promise<EmployeeModel[]>;
    abstract createEmployee(employee: EmployeeModel, authData: AuthDataModel): Promise<EmployeeModel>;
    abstract updateEmployee(employee: EmployeeModel, authData: AuthDataModel): Promise<EmployeeModel | null>;
    abstract deleteEmployee(id: string): Promise<boolean>;
}

class EmployeeDataSource extends BaseEmployeeDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async getEmployeeById(id: string): Promise<EmployeeModel> {
        const response = await this.apiClient.get(Endpoints.employee.details, {
            pathVariables: { id: id },
        });
        return EmployeeModel.fromJson(response.data);
    }

    override async getAllEmployees(): Promise<EmployeeModel[]> {
        console.log('DS Get');
        const response = await this.apiClient.get(Endpoints.employee.list);
        return response.data.items.map((item: any) => EmployeeModel.fromJson(item));

    }

    override async createEmployee(employee: EmployeeModel, authData: AuthDataModel): Promise<EmployeeModel> {
        console.log('DS', employee.toJsonWithAuthData(authData));
        const response = await this.apiClient.post(Endpoints.employee.create, employee.toJsonWithAuthData(authData));
        return EmployeeModel.fromJson(response.data);
    }

    override async updateEmployee(employee: EmployeeModel, authData: AuthDataModel): Promise<EmployeeModel | null> {
        const response = await this.apiClient.patch(Endpoints.employee.update, employee.toJsonWithAuthData(authData), {
            pathVariables: { id: employee.id },
        });
        return EmployeeModel.fromJson(response.data);
    }

    override async deleteEmployee(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.employee.delete, {
            pathVariables: { id: id },
        });
        return true;
    }
}

export { BaseEmployeeDataSource, EmployeeDataSource };