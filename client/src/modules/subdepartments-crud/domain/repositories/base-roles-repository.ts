import RoleInterface from "../interfaces/role-interface";

abstract class BaseRolesRepository {
    abstract createRole(role: RoleInterface): Promise<boolean>;
    abstract updateRole(role: RoleInterface): Promise<boolean>;
    abstract getAllRoles(): Promise<RoleInterface[]>;
    abstract getRoleById(roleId: string): Promise<RoleInterface>;
    abstract deleteRoleById(roleId: string): Promise<boolean>;
}

export default BaseRolesRepository;