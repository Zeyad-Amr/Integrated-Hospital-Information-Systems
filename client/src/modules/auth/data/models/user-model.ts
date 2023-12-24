import { roleList, shiftList, departmentList } from '../../domain/data-values/constants';
import UserInterface from '../../domain/interfaces/user-interface';
import AuthDataModel from './auth-data-model';
import PersonModel from './person-model';

export default class UserModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: UserInterface): any {
        return {
            role: entity.role?.id,
            shift: entity.shift?.id,
            department: entity.department?.id,
            person: entity.person ? PersonModel.toJson(entity.person) : null,
            auth: entity.auth ? AuthDataModel.toJson(entity.auth) : null,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): UserInterface {
        return {
            id: json.id,
            role: roleList.find((role) => role.id === json.role) ?? roleList[0],
            shift: shiftList.find((shift) => shift.id === json.shift) ?? shiftList[0],
            department: departmentList.find((department) => department.id === json.department) ?? departmentList[0],
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            person: PersonModel.fromJson(json.person),
            auth: AuthDataModel.fromJson(json.auth),
        };
    }
}
