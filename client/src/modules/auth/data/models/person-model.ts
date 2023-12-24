import { genderList, governateList, identityList } from '../../domain/data-values/constants';
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
            verificationMethod: entity.verificationMethod?.id,
            gender: entity.gender?.id,
            birthDate: entity.birthDate,
            phone: entity.phone,
            governate: entity.governate?.id,
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
            verificationMethod: identityList.find((identity) => identity.id === json.verificationMethod) ?? identityList[0],
            gender: genderList.find((gender) => gender.id === json.gender) ?? genderList[0],
            birthDate: new Date(json.birthDate),
            phone: json.phone,
            governate: governateList.find((governate) => governate.id === json.governate) ?? governateList[0],
            address: json.address,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        };
    }
}
