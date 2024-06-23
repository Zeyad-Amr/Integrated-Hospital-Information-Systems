import { TriageAXInterface, TriageTransferInterface } from '../../domain/interfaces/triageAX-interface';
import VitalsModel from './vitals-model';

export default class TriageAXModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: TriageAXInterface): any {
        return {
            mainComplaint: entity.mainComplaint,
            LOCId: entity.LOCId,
            triageTypeId: entity.triageTypeId,
            comorbidityIds: entity.comorbidityIds,
            transferTo: entity.transferTo,
            vitals: entity.vitals ? VitalsModel.toJson(entity.vitals) : entity.vitals,
        };
    }

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static triageTransferToJson(entity: TriageTransferInterface): any {
        return {
            mainComplaint: entity.mainComplaint,
            toSubDepId: entity.toSubDepId,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): TriageAXInterface {
        return {
            mainComplaint: json.mainComplaint,
            LOCId: json.LOCId,
            triageTypeId: json.triageTypeId,
            comorbidityIds: json.comorbidityIds,
            transferTo: json.transferTo,
            vitals: VitalsModel.fromJson(json.vitals),
        };
    }
}
