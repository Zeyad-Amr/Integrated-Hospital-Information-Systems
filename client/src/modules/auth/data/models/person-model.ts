import PersonInterface from '../../domain/interfaces/person-interface';

export default class PersonModel {
    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: PersonInterface): any {
        return {
            // id: entity.id,
            firstName: entity.firstName,
            secondName: entity.secondName,
            thirdName: entity.thirdName,
            fourthName: entity.fourthName,
            SSN: entity.SSN,
            verificationMethod: entity.verificationMethod,
            gender: entity.gender,
            birthDate: entity.birthDate,
            phone: entity.phone,
            governate: entity.governate,
            address: entity.address,
            // createdAt: entity.createdAt,
            // updatedAt: entity.updatedAt,
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
            verificationMethod: json.verificationMethod,
            gender: json.gender,
            birthDate: new Date(json.birthDate),
            phone: json.phone,
            governate: json.governate,
            address: json.address,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        };
    }
}
