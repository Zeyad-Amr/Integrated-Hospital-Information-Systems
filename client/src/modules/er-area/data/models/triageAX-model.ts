import TriageModel from '@/modules/emr/models/triage-model';
import { TriageAXInterface, TriageTransferInterface } from '../../domain/interfaces/triageAX-interface';
import VitalsModel from './vitals-model';

export default class TriageAXModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: TriageAXInterface): any {
        return {
            mainComplaint: entity.triageTransfer?.mainComplaint,
            toSubDepId: entity.triageTransfer?.toSubDepId,
            triage: entity.triage ? TriageModel.toJson(entity.triage) : entity.triage,
            vitals: entity.vitals ? VitalsModel.toJson(entity.vitals) : entity.vitals,
            patientId: entity.patientId,
            visitCode: entity.visitCode,
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
    // static fromJson(json: any): TriageAXInterface {
    //     return {
    //         mainComplaint: json.mainComplaint,
    //         LOCId: json.LOCId,
    //         triageTypeId: json.triageTypeId,
    //         comorbidityIds: json.comorbidityIds,
    //         transferTo: json.transferTo,
    //         vitals: VitalsModel.fromJson(json.vitals),
    //     };
    // }
}
