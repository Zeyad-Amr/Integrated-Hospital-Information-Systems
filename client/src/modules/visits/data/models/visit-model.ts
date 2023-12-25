import PersonModel from '../../../auth/data/models/person-model';
import VisitInterface from '../../domain/interfaces/visit-interface';

export default class VisitModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: VisitInterface): any {
        return {
            patient: entity.patient !== null ? PersonModel.toJson(entity.patient!) : null,
            companion: entity.companion !== null ? PersonModel.toJson(entity.companion!) : null,
            visit: {
                sequenceNumber: entity.sequenceNumber,
                kinship: entity.kinship,
            }
        };
    }

    static toUpdateJson(entity: VisitInterface): any {
        return {
            patient: entity.patient !== null ? PersonModel.toJson(entity.patient!) : null,
            companion: entity.companion !== null ? PersonModel.toJson(entity.companion!) : null,
            visitCode: entity.code,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): VisitInterface {
        return {
            code: json.code,
            sequenceNumber: json.sequenceNumber,
            kinship: json.kinship,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            patient: PersonModel.fromJson(json.patient),
            companion: PersonModel.fromJson(json.companion),
        };
    }
}
