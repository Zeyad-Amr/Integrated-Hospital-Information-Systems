import { allValuesUndefined } from '@/core/shared/utils/object-operations';
import PersonModel from '../../../../core/shared/modules/person/data/models/person-model';
import IncidentInterface from '../../domain/interfaces/incident-interface';
import AdditionalDataModel from './additional-data-model';

export default class IncidentModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: IncidentInterface): any {
        return {
            numberOfPatients: entity.numOfPatients,
            additionalInfo: entity.additionalInfo && !allValuesUndefined(entity.additionalInfo) ? AdditionalDataModel.toJson(entity.additionalInfo) : undefined,
            companions: entity.companions ?
                entity.companions.map((companion) => ({ ...PersonModel.toJson(companion), kinshipId: companion.kinship }))
                : []
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): IncidentInterface {
        return {
            numOfPatients: json.numberOfPatients,
            additionalInfo: AdditionalDataModel.fromJson(json.additionalInfo),
            companions: json.companions,

        };
    }
}
