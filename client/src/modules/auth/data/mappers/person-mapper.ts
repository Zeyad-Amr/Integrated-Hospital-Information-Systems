import PersonInterface from "../../domain/interfaces/person-interface";
import PersonModel from "../models/person-model";

class PersonMapper {
    static toModel(entity: PersonInterface): PersonModel {
        return new PersonModel({
            id: entity.id,
            firstName: entity.firstName,
            secondName: entity.secondName,
            thirdName: entity.thirdName,
            fourthName: entity.fourthName,
            SSN: entity.SSN,
            verificationMethod: entity.verificationMethod,
            gender: entity.gender,
            birthDate: entity.birthDate,
            phone: entity.phone,
            email: entity.email,
            governate: entity.governate,
            address: entity.address,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }

    static fromModel(model: PersonModel): PersonInterface {
        return {
            id: model.id,
            firstName: model.firstName,
            secondName: model.secondName,
            thirdName: model.thirdName,
            fourthName: model.fourthName,
            SSN: model.SSN,
            verificationMethod: model.verificationMethod,
            gender: model.gender,
            birthDate: model.birthDate,
            phone: model.phone,
            email: model.email,
            governate: model.governate,
            address: model.address,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    }
}

export default PersonMapper;
