import UserInterface from '../../domain/interfaces/user-interface';
import AuthDataModel from './auth-data-model';
import PersonModel from '../../../../core/shared/modules/person/data/models/person-model';
import { ExtendedSubDepartmentsInterface } from '@/modules/employees/domain/interfaces/employee-interface';

export default class UserModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: UserInterface): any {
        return {
            roleId: entity.roleId,
            shiftId: entity.shiftId,
            subDepartmentIds: entity.subDepartmentIds,
            person: entity.person ? PersonModel.toJson(entity.person) : null,
            auth: entity.auth ? AuthDataModel.toJson(entity.auth) : null,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): UserInterface {
        return {
            id: json.id,
            roleId: json.roleId,
            shiftId: json.shiftId,
            subDepartmentIds: json?.subdepartments?.map((suDepartmentId: ExtendedSubDepartmentsInterface) => suDepartmentId?.id),
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            person: PersonModel.fromJson(json.person),
            auth: AuthDataModel.fromJson(json.auth),
        };
    }

    static fromGetMeJson(json: any): UserInterface {
        return {
            id: json.employee.id,
            roleId: json.employee.roleId,
            shiftId: json.employee.shiftId,
            subDepartmentIds: json?.employee.subdepartments?.map((suDepartmentId: ExtendedSubDepartmentsInterface) => suDepartmentId?.id),
            createdAt: json.employee.createdAt,
            updatedAt: json.employee.updatedAt,
            person: PersonModel.fromJson(json.employee.person),
            auth: AuthDataModel.fromJson(json),
        };

    }
}
