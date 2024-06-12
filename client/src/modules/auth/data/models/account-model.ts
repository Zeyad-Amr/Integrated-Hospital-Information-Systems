import { AccountInterface, AccountSubDepartmentPermissionInterface } from '../../domain/interfaces/account-interface';
import UserModel from './user-model';
import SubDepartmentsModel from '@/modules/management/data/models/sub-departments';
import { SubDepartmentInterface } from '@/modules/management/domain/interfaces/sub-departments-interface';

export default class AccountModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AccountInterface {
        return {
            user: UserModel.fromGetMeJson(json.user),
            permissions: this.handlePermissions(json.permissions, json.user)
        };
    }

    //* --------------------- Methods ---------------------

    static handlePermissions = (permissions: any[], user: any): AccountSubDepartmentPermissionInterface[] => {

        const subDepartments: SubDepartmentInterface[] = user.employee.subdepartments.map((subDept: any) => SubDepartmentsModel.fromJson(subDept));

        return subDepartments.map(subDept => {
            const subDeptPermissions = permissions.filter(permission => permission.subDepartment.id === subDept.id);
            return {
                subDepartment: subDept,
                permissions: subDeptPermissions.map(permission => {
                    return {
                        id: permission.feature.id.toString(),
                        value: permission.feature.name,
                        code: permission.feature.code
                    };
                })
            };
        });
    }
}

