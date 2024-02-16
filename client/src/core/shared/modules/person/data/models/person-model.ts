import store from '@/core/state/store';
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
            birthDate: new Date(entity.birthDate ?? Date.now().toString()),
            phone: '+2' + entity.phone,
            governate: entity.governate?.toString(),
            address: entity.address
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): PersonInterface {
        const state = store.getState();
        return {
            id: json.id,
            firstName: json.firstName,
            secondName: json.secondName,
            thirdName: json.thirdName,
            fourthName: json.fourthName,
            SSN: json.SSN,
            verificationMethod: json.verificationMethodId,
            gender: json.genderId,
            birthDate: json.birthDate ? new Date(json.birthDate) : undefined,
            phone: json.phone,
            governate: json.governate,
            address: json.address,
            createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
            updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
        };
    }
}
