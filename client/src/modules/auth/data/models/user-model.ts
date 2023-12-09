import UserInterface from '../../domain/interfaces/user-interface';
import AuthDataModel from './auth-data-model';
import PersonModel from './person-model';

export default class UserModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: UserInterface): any {
        return {
            role: entity.role,
            shift: entity.shift,
            department: entity.department,
            createdById: entity.createdById,
            person: PersonModel.toJson(entity.person),
            auth: AuthDataModel.toJson(entity.auth),
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): UserInterface {
        return {
            id: json.id,
            role: json.role,
            shift: json.shift,
            department: json.department,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            createdById: json.createdById,
            person: PersonModel.fromJson(json.person),
            auth: AuthDataModel.fromJson(json.auth),
        };
    }
}
