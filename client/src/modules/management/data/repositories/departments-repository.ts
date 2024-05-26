import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BaseDepartmentsDataSource } from "../datasources/departments-datasource";
import DepartmentsInterface from "../../domain/interfaces/departments-interface";
import BaseDepartmentsRepository from "../../domain/repositories/base-departments-repository";

class DepartmentsRepository extends BaseDepartmentsRepository {
    constructor(private baseDepartmentsDataSource: BaseDepartmentsDataSource) {
        super();
    }

    override async getAllDepartments(): Promise<DepartmentsInterface[]> {
        try {
            const result = await this.baseDepartmentsDataSource.getAllDepartments();
            console.log(result, "getAllDepartments");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

}

export default DepartmentsRepository;