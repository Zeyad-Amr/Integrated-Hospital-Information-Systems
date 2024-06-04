import { SubDepartmentAssignFeaturesInterface, SubDepartmentInterface } from '../../domain/interfaces/sub-departments-interface';

export default class SubDepartmentsModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: SubDepartmentInterface): any {
        return {
            name: entity.name,
            roomId: entity.roomId,
            specializationId: entity.specializationId,
            departmentId: entity.departmentId
        }
    }

    static assignFeaturesToJson(entity: SubDepartmentAssignFeaturesInterface): any {
        return {
            AddedFeatures: entity.AddedFeatures,
            RemovedFeatures: entity.RemovedFeatures,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): SubDepartmentInterface {
        return {
            id: json.id,
            name: json.name,
            roomId: json.roomId,
            specializationId: json.specializationId,
            departmentId: json.departmentId
        };
    }
}
