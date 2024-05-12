import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseEmployeeRepository from '../../domain/repositories/base-employee-repository';
import { BaseEmployeeDataSource } from '../datasources/employee-datasource';
import EmployeeInterface from "../../domain/interfaces/employee-interface";

class EmployeeRepository extends BaseEmployeeRepository {
    constructor(private baseEmployeeDataSource: BaseEmployeeDataSource) {
        super();
    }

    override async getEmployeeById(id: string): Promise<EmployeeInterface> {
        try {
            const result = await this.baseEmployeeDataSource.getEmployeeById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async getAllEmployees(): Promise<EmployeeInterface[]> {
        try {
            const result = await this.baseEmployeeDataSource.getAllEmployees();
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async createEmployee(employee: EmployeeInterface): Promise<boolean> {
        try {
            const result = await this.baseEmployeeDataSource.createEmployee(employee);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async updateEmployee(employee: EmployeeInterface): Promise<boolean> {
        try {
            const result = await this.baseEmployeeDataSource.updateEmployee(employee);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async deleteEmployee(id: string): Promise<boolean> {
        try {
            const result = await this.baseEmployeeDataSource.deleteEmployee(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

}

export default EmployeeRepository;