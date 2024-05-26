import RoleInterface from '../../domain/interfaces/role-interface';

export default class RolesModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: RoleInterface): any {
        return {
            value: entity.value,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): RoleInterface {
        return {
            id: json.id,
            value: json.value,
        };
    }
}
