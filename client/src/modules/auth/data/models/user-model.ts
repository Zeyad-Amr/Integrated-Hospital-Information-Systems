import store from '@/core/state/store';
import UserInterface from '../../domain/interfaces/user-interface';
import AuthDataModel from './auth-data-model';
import PersonModel from './person-model';

export default class UserModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: UserInterface): any {
        return {
            roleId: entity.role,
            shiftId: entity.shift,
            departmentId: entity.department,
            person: entity.person ? PersonModel.toJson(entity.person) : null,
            auth: entity.auth ? AuthDataModel.toJson(entity.auth) : null,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): UserInterface {
        const state = store.getState();
        return {
            id: json.id,
            role: json.role ?? state.lookups.lookups.roleTypes[0],
            shift: json.shift ?? state.lookups.lookups.shiftTypes[0],
            department: json.department ?? state.lookups.lookups.departments[0],
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            person: PersonModel.fromJson(json.person),
            auth: AuthDataModel.fromJson(json.auth),
        };
    }
}
