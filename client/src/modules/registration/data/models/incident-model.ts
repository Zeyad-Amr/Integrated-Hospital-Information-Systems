import { allValuesUndefined } from '@/core/shared/utils/object-operations';
import PersonModel from '../../../../core/shared/modules/person/data/models/person-model';
import IncidentInterface from '../../domain/interfaces/incident-interface';
import AdditionalDataModel from './additional-data-model';
import CompanionModel from './companion-model';
import VisitModel from './visit-model';

export default class IncidentModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: IncidentInterface): any {
        return {
            numberOfIncompletedVisits: entity.numberOfIncompletedVisits,
            numberOfVisits: entity.numberOfVisits,
            additionalInfo: entity.additionalInfo && !allValuesUndefined(entity.additionalInfo) ? AdditionalDataModel.toJson(entity.additionalInfo) : undefined,
            companions: entity.companions ?
                entity.companions.map((companion) => ({ ...PersonModel.toJson(companion), kinshipId: companion.kinship }))
                : []
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): IncidentInterface {
        return {
            numberOfIncompletedVisits: json.numberOfIncompletedVisits.toString(),
            numberOfVisits: json.numberOfPatients.toString(),
            additionalInfo: AdditionalDataModel.fromJson(json.AdditionalInformation),
            companions: (json.CompanionsOnIncidents || []).map((companion: any) => CompanionModel.fromJson(companion.companion)),
            visits: json.visits.map((visit: any) => VisitModel.fromJson(visit)),
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,

        };
    }
}
