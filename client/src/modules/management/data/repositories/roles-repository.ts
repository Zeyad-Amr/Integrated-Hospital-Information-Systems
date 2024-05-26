import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BaseRolesDataSource } from "../datasources/roles-datasource";
import RoleInterface from "../../domain/interfaces/role-interface";
import BaseRolesRepository from "../../domain/repositories/base-roles-repository";

class RolesRepository extends BaseRolesRepository {
    constructor(private baseRolesDataSource: BaseRolesDataSource) {
        super();
    }

    override async createRole(role: RoleInterface): Promise<boolean> {
        try {
            await this.baseRolesDataSource.createRole(role);
            return true;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateRole(role: RoleInterface): Promise<boolean> {
        try {
            await this.baseRolesDataSource.updateRole(role);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllRoles(): Promise<RoleInterface[]> {
        try {
            const result = await this.baseRolesDataSource.getAllRoles();
            console.log(result, "getAllRoles");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getRoleById(id: string): Promise<RoleInterface> {
        try {
            const result = await this.baseRolesDataSource.getRoleById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async deleteRoleById(id: string): Promise<boolean> {
        try {
            const result = await this.baseRolesDataSource.deleteRoleById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default RolesRepository;