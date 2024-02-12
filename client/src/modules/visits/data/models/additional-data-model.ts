import { AdditionalDataInterface } from "../../domain/interfaces/additional-data-interface";

export default class AdditionalDataModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(data: AdditionalDataInterface): any {
        return {
            cameFromId: data.comeFrom,
            injuryLocation: data.place,
            injuryCause: data.reason,
            notes: data.notes,
            car: {
                firstChar: data.firstChar,
                secondChar: data.secondChar,
                thirdChar: data.thirdChar,
                number: data.carNum
            },
            attendant: {
                name: data.attendantName,
                id: data.attendantSerialNumber,
                SSN: data.attendantSSN,
                roleId: data.attendantRole
            }
        }
    }


    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AdditionalDataInterface {
        return {
            comeFrom: json.cameFromId,
            place: json.injuryLocation,
            reason: json.injuryCause,
            notes: json.notes,
            firstChar: json.car.firstChar,
            secondChar: json.car.secondChar,
            thirdChar: json.car.thirdChar,
            carNum: json.car.number,
            attendantName: json.attendant.name,
            attendantSerialNumber: json.attendant.id,
            attendantSSN: json.attendant.SSN,
            attendantRole: json.attendant.roleId
        };
    }
}
