import { allValuesUndefined } from '@/core/shared/utils/object-operations';
import PersonModel from '../../../../core/shared/modules/person/data/models/person-model';
import VisitInterface from '../../domain/interfaces/visit-interface';
import AdditionalDataModel from './additional-data-model';
import CompanionModel from './companion-model';
import { CompleteVisitInterface } from '../../domain/interfaces/complete-visit-interface';

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

    static toUpdateJson(entity: CompleteVisitInterface): any {
        return {
            patient: entity.patient ? PersonModel.toJson(entity.patient) : undefined,
            companion: entity.companion && !allValuesUndefined(entity.companion) ? { ...PersonModel.toJson(entity.companion), kinshipId: entity.companion.kinship } : undefined,
            visitCode: entity.visitCode,
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): VisitInterface {
        return {
            code: json.code,
            sequenceNumber: json.sequenceNumber,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            patient: json.patientId == null && json.patient == null ? undefined : PersonModel.fromJson(json.patient.person),
            companion: json.companionId == null && json.companion == null ? undefined : CompanionModel.fromJson(json.companion),
            additionalInfo: json.AdditionalInformation == null ? undefined : AdditionalDataModel.fromJson(json.AdditionalInformation),
        };
    }
}
