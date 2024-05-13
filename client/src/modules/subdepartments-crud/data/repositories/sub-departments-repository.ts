import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BaseSubDepartmentsDataSource } from "../datasources/sub-departments-datasource";
import SubDepartmentsInterface from "../../domain/interfaces/sub-departments-interface";

class SubDepartmentsRepository extends BaseSubDepartmentsDataSource {
    constructor(private baseSubDepartmentsDataSource: BaseSubDepartmentsDataSource) {
        super();
    }

    override async createSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean> {
        try {
            await this.baseSubDepartmentsDataSource.createSubDepartment(subDepartment);
            return true;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean> {
        try {
            await this.baseSubDepartmentsDataSource.updateSubDepartment(subDepartment);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllSubDepartments(): Promise<SubDepartmentsInterface[]> {
        try {
            const result = await this.baseSubDepartmentsDataSource.getAllSubDepartments();
            console.log(result,"getAllSubDepartments");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getSubDepartmentById(id: string): Promise<SubDepartmentsInterface> {
        try {
            const result = await this.baseSubDepartmentsDataSource.getSubDepartmentById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async deleteSubDepartmentById(id: string): Promise<boolean> {
        try {
            const result = await this.baseSubDepartmentsDataSource.deleteSubDepartmentById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default SubDepartmentsRepository;