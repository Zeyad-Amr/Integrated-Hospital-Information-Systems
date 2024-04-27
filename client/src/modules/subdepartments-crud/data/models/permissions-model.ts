import PermissionInterface from '../../domain/interfaces/permission-interface';

export default class PermissionsModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: PermissionInterface): any {
        return {
            featureId: entity.featureId,
            roleId: entity.roleId,
            subDepartmentId: entity.subDepartmentId,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): PermissionInterface {
        return {
            id: json.id,
            roleId: json.roleId,
            subDepartmentId : json.subDepartmentId,
            featureId : json.featureId,
        };
    }
}
