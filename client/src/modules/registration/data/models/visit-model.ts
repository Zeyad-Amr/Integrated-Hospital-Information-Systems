import { allValuesUndefined } from '@/core/shared/utils/object-operations';
import PersonModel from '../../../../core/shared/modules/person/data/models/person-model';
import VisitInterface from '../../domain/interfaces/visit-interface';
import AdditionalDataModel from './additional-data-model';

export default class VisitModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: VisitInterface): any {
        return {
            patient: entity.patient ? PersonModel.toJson(entity.patient) : undefined,
            companion: entity.companion && !allValuesUndefined(entity.companion) ? { ...PersonModel.toJson(entity.companion), kinshipId: entity.companion.kinship } : undefined,
            visit: {
                sequenceNumber: entity.sequenceNumber,
            },
            additionalInfo: entity.additionalInfo && !allValuesUndefined(entity.additionalInfo) ? AdditionalDataModel.toJson(entity.additionalInfo) : undefined,
        }
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
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            patient: PersonModel.fromJson(json.patient),
            companion: json.companion,
        };
    }
}
