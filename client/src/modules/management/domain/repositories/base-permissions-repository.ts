import PermissionInterface from "../interfaces/permission-interface";

abstract class BasePermissionsRepository {
    abstract createPermission(permission: PermissionInterface): Promise<boolean>;
    abstract updatePermission(room: PermissionInterface): Promise<boolean>;
    abstract getAllPermissions(): Promise<PermissionInterface[]>;
    abstract getPermissionById(permissionId: string): Promise<PermissionInterface>;
    abstract deletePermissionById(permissionId: string): Promise<boolean>;
}

export default BasePermissionsRepository;