import { ApiClient, Endpoints } from "@/core/api";
import RoleInterface from "../../domain/interfaces/role-interface";
import RolesModel from "../models/roles-model";

abstract class BaseRolesDataSource {
    abstract createRole(role: RoleInterface): Promise<boolean>;
    abstract updateRole(role: RoleInterface): Promise<boolean>;
    abstract getAllRoles(): Promise<RoleInterface[]>;
    abstract getRoleById(roleId: string): Promise<RoleInterface>;
    abstract deleteRoleById(roleId: string): Promise<boolean>;
}

class RolesDataSource extends BaseRolesDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createRole(role : RoleInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.role.create, RolesModel.toJson(role));
        return response.data;
    }

    override async updateRole(role : RoleInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.role.update, RolesModel.toJson(role) , {
            pathVariables: { id: role.id },
        } );
        return true;
    }

    override async getAllRoles(): Promise<RoleInterface[]> {
        const response = await this.apiClient.get(Endpoints.role.list);
        console.log(response.data,'getAllRoles');
        return response.data.map((role: any) => RolesModel.fromJson(role));
    }

    override async getRoleById(id: string): Promise<RoleInterface> {
        const response = await this.apiClient.get(Endpoints.role.details, {
            pathVariables: { id: id },
        });
        return RolesModel.fromJson(response.data);
    }

    override async deleteRoleById(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.role.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { RolesDataSource, BaseRolesDataSource };