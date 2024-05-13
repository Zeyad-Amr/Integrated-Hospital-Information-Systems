import { ApiClient, Endpoints } from "@/core/api";
import PermissionInterface from "../../domain/interfaces/permission-interface";
import PermissionsModel from "../models/permissions-model";

abstract class BasePermissionsDataSource {
    abstract createPermission(permission: PermissionInterface): Promise<boolean>;
    abstract updatePermission(room: PermissionInterface): Promise<boolean>;
    abstract getAllPermissions(): Promise<PermissionInterface[]>;
    abstract getPermissionById(permissionId: string): Promise<PermissionInterface>;
    abstract deletePermissionById(permissionId: string): Promise<boolean>;
}

class PermissionsDataSource extends BasePermissionsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createPermission(permission : PermissionInterface): Promise<boolean> {
        const response = await this.apiClient.post(Endpoints.permission.create, PermissionsModel.toJson(permission));
        return response.data;
    }

    override async updatePermission(permission : PermissionInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.permission.update, PermissionsModel.toJson(permission) , {
            pathVariables: { id: permission.id },
        } );
        return true;
    }

    override async getAllPermissions(): Promise<PermissionInterface[]> {
        const response = await this.apiClient.get(Endpoints.permission.list);
        console.log(response.data,'getAllPermissions');
        return response.data.map((permission: any) => PermissionsModel.fromJson(permission));
    }

    override async getPermissionById(id: string): Promise<PermissionInterface> {
        const response = await this.apiClient.get(Endpoints.permission.details, {
            pathVariables: { id: id },
        });
        return PermissionsModel.fromJson(response.data);
    }

    override async deletePermissionById(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.permission.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { PermissionsDataSource, BasePermissionsDataSource };