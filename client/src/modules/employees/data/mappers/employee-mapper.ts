import EmployeeModel from "../models/employee-model";
import EmployeeEntity from "../../domain/entities/employee-entity";

class EmployeeMapper {
    static entityToModel(entity: EmployeeEntity): EmployeeModel {
        return new EmployeeModel({
            id: entity.id,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            personID: entity.personID,
            createdById: entity.createdById,
            person: {
                id: entity.person.id,
                firstName: entity.person.firstName,
                secondName: entity.person.secondName,
                thirdName: entity.person.thirdName,
                fourthName: entity.person.fourthName,
                SSN: entity.person.SSN,
                verificationMethod: entity.person.verificationMethod,
                gender: entity.person.gender,
                birthDate: entity.person.birthDate,
                phone: entity.person.phone,
                email: entity.person.email,
                governate: entity.person.governate,
                address: entity.person.address,
                createdAt: entity.person.createdAt,
                updatedAt: entity.person.updatedAt,
            }
            // Map other properties as needed
        });
    }

    static modelToEntity(model: EmployeeModel): EmployeeEntity {
        return new EmployeeEntity({
            id: model.id,
            role: model.role,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            personID: model.personID,
            createdById: model.createdById,
            person: {
                id: model.person.id,
                firstName: model.person.firstName,
                secondName: model.person.secondName,
                thirdName: model.person.thirdName,
                fourthName: model.person.fourthName,
                SSN: model.person.SSN,
                verificationMethod: model.person.verificationMethod,
                gender: model.person.gender,
                birthDate: model.person.birthDate,
                phone: model.person.phone,
                email: model.person.email,
                governate: model.person.governate,
                address: model.person.address,
                createdAt: model.person.createdAt,
                updatedAt: model.person.updatedAt,
            }
            // Map other properties as needed
        });
    }
}

export default EmployeeMapper;
