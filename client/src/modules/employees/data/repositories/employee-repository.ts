import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseEmployeeRepository from '../../domain/repositories/base-employee-repository';
import { BaseEmployeeDataSource } from '../datasources/employee-datasource';
import EmployeeEntity from '../../domain/entities/employee-entity';
import EmployeeMapper from "../mappers/employee-mapper";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
import AuthDataMapper from "@/modules/auth/data/mappers/login-user-mapper";

class EmployeeRepository extends BaseEmployeeRepository {
    constructor(private baseEmployeeDataSource: BaseEmployeeDataSource) {
        super();
    }

    override async getEmployeeById(id: string): Promise<EmployeeEntity> {
        try {
            const result = await this.baseEmployeeDataSource.getEmployeeById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async getAllEmployees(): Promise<EmployeeEntity[]> {
        try {
            const result = await this.baseEmployeeDataSource.getAllEmployees();
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async createEmployee(employee: EmployeeEntity, authData: AuthDataEntity): Promise<EmployeeEntity> {
        try {
            console.log('Repo', EmployeeMapper.entityToModel(employee), AuthDataMapper.entityToModel(authData));

            const result = await this.baseEmployeeDataSource.createEmployee(EmployeeMapper.entityToModel(employee), AuthDataMapper.entityToModel(authData));
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
    override async updateEmployee(employee: EmployeeEntity, authData: AuthDataEntity): Promise<EmployeeEntity> {
        try {
            const result = await this.baseEmployeeDataSource.updateEmployee(EmployeeMapper.entityToModel(employee), AuthDataMapper.entityToModel(authData));
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