import TriageAXInterface from '../../domain/interfaces/triageAX-interface';

export default class TriageAXModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: TriageAXInterface): any {
        return {
            mainComplaint: entity.mainComplaint,
            LOCId: entity.LOCId,
            triageTypeId: entity.triageTypeId,
            comorbidityIds: entity.comorbidityIds,
            transferTo: entity.transferTo,
            vitals: entity.vitals,
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
            vitals: json.vitals,
        };
    }
}
