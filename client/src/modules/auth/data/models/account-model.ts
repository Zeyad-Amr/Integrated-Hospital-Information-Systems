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

    static handlePermissions = (permissions: any[]): AccountSubDepartmentPermissionInterface[] => {
        const subDeptMap: { [key: number]: AccountSubDepartmentPermissionInterface } = {};

        permissions.forEach(permission => {
            const subDeptId = permission.subDepartment.id;

            if (!subDeptMap[subDeptId]) {
                subDeptMap[subDeptId] = {
                    subDepartment: {
                        id: permission.subDepartment.id,
                        name: permission.subDepartment.name,
                        roomId: permission.subDepartment.roomId,
                        specializationId: permission.subDepartment.specializationId,
                        departmentId: permission.subDepartment.departmentId
                    },
                    permissions: []
                };
            }

            subDeptMap[subDeptId].permissions.push({
                id: permission.feature.id.toString(),
                value: permission.feature.name,
                code: permission.feature.code
            });
        });

        return Object.values(subDeptMap);
    }
}

