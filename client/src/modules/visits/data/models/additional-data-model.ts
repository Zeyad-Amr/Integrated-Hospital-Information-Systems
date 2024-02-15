import { allValuesUndefined } from "@/core/shared/utils/object-operations";
import { AdditionalDataInterface } from "../../domain/interfaces/additional-data-interface";

export default class AdditionalDataModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(data: AdditionalDataInterface): any {
        return {
            cameFromId: data.comeFrom,
            injuryLocation: data.place,
            injuryCause: data.reason,
            notes: data.notes,
            car: !allValuesUndefined({
                firstChar: data.firstChar,
                secondChar: data.secondChar,
                thirdChar: data.thirdChar,
                number: data.carNum
            }) ? {
                firstChar: data.firstChar,
                secondChar: data.secondChar,
                thirdChar: data.thirdChar,
                number: data.carNum
            } : undefined,
            attendant: !allValuesUndefined({
                name: data.attendantName,
                id: data.attendantSerialNumber,
                SSN: data.attendantSSN,
                roleId: data.attendantRole
            }) ? {
                name: data.attendantName,
                id: data.attendantSerialNumber,
                SSN: data.attendantSSN,
                roleId: data.attendantRole
            } : undefined
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
