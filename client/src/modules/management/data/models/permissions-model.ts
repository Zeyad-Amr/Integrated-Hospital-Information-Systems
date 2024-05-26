import PermissionInterface from '../../domain/interfaces/permission-interface';
export default class PermissionsModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: PermissionInterface): any {
        return {
            featureId: entity.featureId,
            roleId: entity.roleId,
            subdepartmentId: entity.subdepartmentId,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): PermissionInterface {
        return {
            id: json.id,
            featureId : json.featureId,
            roleId : json.roleTypeId,
            subdepartmentId : json.subDepartmentId,
        };
    }
}
