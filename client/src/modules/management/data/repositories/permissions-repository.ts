import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BasePermissionsDataSource } from "../datasources/permissions-datasource";
import PermissionInterface from "../../domain/interfaces/permission-interface";
import BasePermissionsRepository from "../../domain/repositories/base-permissions-repository";

class PermissionsRepository extends BasePermissionsRepository {
    constructor(private basePermissionsDataSource: BasePermissionsDataSource) {
        super();
    }

    override async createPermission(permission: PermissionInterface): Promise<boolean> {
        try {
            await this.basePermissionsDataSource.createPermission(permission);
            return true;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updatePermission(permission: PermissionInterface): Promise<boolean> {
        try {
            await this.basePermissionsDataSource.updatePermission(permission);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllPermissions(): Promise<PermissionInterface[]> {
        try {
            const result = await this.basePermissionsDataSource.getAllPermissions();
            console.log(result, "getAllPermissions");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getPermissionById(id: string): Promise<PermissionInterface> {
        try {
            const result = await this.basePermissionsDataSource.getPermissionById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async deletePermissionById(id: string): Promise<boolean> {
        try {
            const result = await this.basePermissionsDataSource.deletePermissionById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default PermissionsRepository;