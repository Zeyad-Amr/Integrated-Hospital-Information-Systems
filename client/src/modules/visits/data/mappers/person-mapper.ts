import PersonEntity from "../../domain/entities/person-entity";
import PersonModel from "../models/person-model";

class PersonMapper {
    static entityToModel(entity: PersonEntity): PersonModel {
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

    static modelToEntity(model: PersonModel): PersonEntity {
        return new PersonEntity({
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
        });
    }
}

export default PersonMapper;
