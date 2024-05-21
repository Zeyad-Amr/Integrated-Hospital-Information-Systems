import EmployeeModel from '../models/employee-model';
import { ApiClient, Endpoints, FilterQuery } from "@/core/api";
import EmployeeInterface from '../../domain/interfaces/employee-interface';

abstract class BaseEmployeeDataSource {
    abstract getEmployeeById(id: string): Promise<EmployeeInterface>;
    abstract getAllEmployees(filters: FilterQuery[]): Promise<EmployeeInterface[]>;
    abstract createEmployee(employee: EmployeeInterface): Promise<boolean>;
    abstract updateEmployee(employee: EmployeeInterface): Promise<boolean>;
    abstract deleteEmployee(id: string): Promise<boolean>;
}

class EmployeeDataSource extends BaseEmployeeDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async getEmployeeById(id: string): Promise<EmployeeInterface> {
        const response = await this.apiClient.get(Endpoints.employee.details, {
            pathVariables: { id: id },
        });
        return EmployeeModel.fromJson(response.data);
    }

    override async getAllEmployees(filters: FilterQuery[]): Promise<EmployeeInterface[]> {
        const response = await this.apiClient.get(Endpoints.employee.list, { filters: filters });
        return response.data.items.map((item: any) => EmployeeModel.fromJson(item));
    }

    override async createEmployee(employee: EmployeeInterface): Promise<boolean> {
        await this.apiClient.post(Endpoints.employee.create, EmployeeModel.toJson(employee));
        return true;
    }

    override async updateEmployee(employee: EmployeeInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.employee.update, EmployeeModel.toJson(employee), {
            pathVariables: { id: employee.id },
        });
        return true;
    }

    override async deleteEmployee(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.employee.delete, {
            pathVariables: { id: id },
        });
        return true;
    }
}

export { BaseEmployeeDataSource, EmployeeDataSource };