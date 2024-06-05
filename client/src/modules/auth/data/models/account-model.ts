import { AccountInterface, AccountSubDepartmentPermissionInterface } from '../../domain/interfaces/account-interface';
import UserModel from './user-model';

export default class AccountModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AccountInterface {
        return {
            user: UserModel.fromGetMeJson(json.user),
            permissions: this.handlePermissions(json.permissions)
        };
    }

    //* --------------------- Methods ---------------------

    static handlePermissions = (permissions: any): AccountSubDepartmentPermissionInterface[] => {


        const permissionsMap = new Map();
        permissions.forEach((permission: any) => {
            const subDepartmentId = permission.subDepartmentId;
            if (permissionsMap.has(subDepartmentId)) {
                permissionsMap.get(subDepartmentId).push(permission.feature);
            } else {
                permissionsMap.set(subDepartmentId, [permission.feature]);
            }
        });

        const accountPermissions: AccountSubDepartmentPermissionInterface[] = [];
        permissionsMap.forEach((permissions: any, subDepartmentId: any) => {
            accountPermissions.push({
                subDepartment: {
                    id: subDepartmentId,
                    name: permissions[0].subDepartment.name,
                    roomId: permissions[0].subDepartment.roomId,
                    specializationId: permissions[0].subDepartment.specializationId,
                    departmentId: permissions[0].subDepartment.departmentId,
                },
                permissions: permissions,
            });
        });

        return accountPermissions;
    }
}
