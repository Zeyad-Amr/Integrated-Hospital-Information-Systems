import FeatureInterface from '../../domain/interfaces/feature-interface';

export default class FeaturesModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: FeatureInterface): any {
        return {
            name: entity.name,
            subDepartmentId: entity.subDepartmentId,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): FeatureInterface {
        return {
            id: json.id,
            name: json.name,
            subDepartmentId : json.subDepartmentId,
        };
    }
}
