import VitalsInterface from '../../domain/interfaces/vitals-interface';

export default class VitalsModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: VitalsInterface): any {
        return {
            CVP: entity.CVP,
            GCS: entity.GCS,
            painScore: entity.painScore,
            PR: entity.pulseRate,
            RR: entity.respiratoryRate,
            SpO2: entity.SPO2,
            temp: entity.temperature,
            SBP: entity.systolicPressure,
            DBP: entity.diastolicPressure,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): VitalsInterface {
        return {
            CVP: json.CVP,
            GCS: json.GCS,
            painScore: json.painScore,
            pulseRate: json.PR,
            respiratoryRate: json.RR,
            SPO2: json.SpO2,
            temperature: json.temp,
            systolicPressure: json.SBP,
            diastolicPressure: json.DBP,
        };
    }
}
