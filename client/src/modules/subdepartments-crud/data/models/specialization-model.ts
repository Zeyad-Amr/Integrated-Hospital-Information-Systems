import SpecializationInterface from '../../domain/interfaces/specialization -interface';

export default class SpecializationModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: SpecializationInterface): any {
        return {
            name: entity.name,
            description: entity.description ,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): SpecializationInterface {
        return {
            id: json.id,
            name: json.name,
            description: json.description,
        };
    }
}
