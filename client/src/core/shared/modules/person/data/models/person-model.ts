import PersonInterface from '../../domain/interfaces/person-interface';

export default class PersonModel {
    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: PersonInterface): any {
        return {
            firstName: entity.firstName,
            secondName: entity.secondName,
            thirdName: entity.thirdName,
            fourthName: entity.fourthName,
            SSN: entity.SSN,
            verificationMethodId: entity.verificationMethod,
            genderId: entity.gender,
            birthDate: entity.birthDate ? new Date(entity.birthDate) : undefined,
            phone: entity?.phone ? '+2' + entity?.phone : '',
            governateId: entity.governate,
            address: entity.address
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): PersonInterface {
        return {
            id: json.id,
            firstName: json.firstName,
            secondName: json.secondName,
            thirdName: json.thirdName,
            fourthName: json.fourthName,
            SSN: json.SSN,
            verificationMethod: json.verificationMethodId,
            gender: json.genderId,
            birthDate: json.birthDate,
            phone: json.phone?.length == 13 ? json.phone.substring(2) : json.phone,
            governate: json.governateId,
            address: json.address,
        };
    }
}
