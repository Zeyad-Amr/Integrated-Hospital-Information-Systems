import PersonModel from '../../../../core/shared/modules/person/data/models/person-model';
import { CompanionInterface } from '../../domain/interfaces/companion-interface';

export default class CompanionModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: CompanionInterface): any {
        return {
            ...PersonModel.toJson(entity),
            kinship: entity.kinship,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): CompanionInterface {
        return {
            ...PersonModel.fromJson(json.person),
            kinship: json.kinship,
        };
    }
}
