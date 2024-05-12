import UserModel from '@/modules/auth/data/models/user-model';
import EmployeeInterface from '../../domain/interfaces/employee-interface';

export default class EmployeeModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: EmployeeInterface): any {
        const baseJson = UserModel.toJson(entity); // Convert the base model to JSON
        return {
            ...baseJson,
        };
    }

    // static toJsonWithAuthData(entity: EmployeeInterface): any {
    //     return {
    //         person: PersonModel.toJson(PersonEntity.defaultValue()),
    //         auth: AuthDataModel.toJson(entity.auth ?? AuthDataEntity.defaultValue()),
    //         roleId: entity.role?.id,
    //     };
    // }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): EmployeeInterface {
        const baseModel = UserModel.fromJson(json); // Create a UserModel from JSON data
        const {  /* other employee-specific data */ } = json;
        return {
            id: baseModel.id,
            role: baseModel.role,
            shift: baseModel.shift,
            department: baseModel.department,
            createdAt: baseModel.createdAt,
            updatedAt: baseModel.updatedAt,
            person: baseModel.person,
            auth: baseModel.auth,
        };
    }

}
