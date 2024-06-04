import { ErrorResponse, ErrorMessage, FilterQuery, PaginatedList } from "@/core/api";
import { BaseSubDepartmentsDataSource } from "../datasources/sub-departments-datasource";
import { SubDepartmentAssignFeaturesInterface, SubDepartmentInterface } from "../../domain/interfaces/sub-departments-interface";
import BaseSubDepartmentsRepository from "../../domain/repositories/base-sub-departments-repository";

class SubDepartmentsRepository extends BaseSubDepartmentsRepository {
    constructor(private baseSubDepartmentsDataSource: BaseSubDepartmentsDataSource) {
        super();
    }

    override async createSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean> {
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

    override async updateSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean> {
        try {
            await this.baseSubDepartmentsDataSource.updateSubDepartment(subDepartment);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentAssignFeaturesInterface): Promise<boolean> {
        try {
            await this.baseSubDepartmentsDataSource.updateSubDepartmentAssignFeature(assignFeatures);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentInterface>> {
        try {
            const result = await this.baseSubDepartmentsDataSource.getAllSubDepartments(filters);
            console.log(result, "getAllSubDepartments");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getSubDepartmentById(id: string): Promise<SubDepartmentInterface> {
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