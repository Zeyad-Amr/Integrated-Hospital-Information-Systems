import AuthDataModel from '@/modules/auth/data/models/auth-data-model';
import UserModel from '@/modules/auth/data/models/user-model';
import EmployeeInterface from '../../domain/interfaces/employee-interface';
import PersonModel from '@/modules/auth/data/models/person-model';

export default class EmployeeModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: EmployeeInterface): any {
        const baseJson = UserModel.toJson(entity); // Convert the base model to JSON
        return {
            ...baseJson,
        };
    }

    static toJsonWithAuthData(entity: EmployeeInterface): any {
        return {
            personalData: PersonModel.toJson(entity.person),
            auth: AuthDataModel.toJson(entity.auth),
            role: entity.role
        };
    }

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
            createdById: baseModel.createdById,
            person: baseModel.person,
            auth: baseModel.auth,
        };
    }

}
