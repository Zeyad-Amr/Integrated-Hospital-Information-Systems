// import EmployeeMapper from "../../../employees/data/mappers/employee-mapper";
import VisitEntity from "../../domain/entities/visit-entity";
import VisitModel from "../models/visit-model";
import PersonMapper from "../../../auth/data/mappers/person-mapper";
// import EmployeeModel from "../../../employees/data/models/employee-model";
import PersonModel from "../../../auth/data/models/person-model";

class VisitMapper {
    static entityToModel(entity: VisitEntity): VisitModel {
        const patientModel = PersonMapper.entityToModel(entity.patient);
        // const employeeModel = EmployeeMapper.entityToModel(entity.creator);
        const companionModel = PersonMapper.entityToModel(entity.companion);

        return new VisitModel({
            code: entity.code,
            sequenceNumber: entity.sequenceNumber,
            kinship: entity.kinship,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            // creator: employeeModel,
            patient: patientModel,
            companion: companionModel,
        });
    }

    static modelToEntity(model: VisitModel): VisitEntity {
        const patientEntity = PersonMapper.modelToEntity(model.patient as PersonModel);
        // const employeeEntity = EmployeeMapper.modelToEntity(model.creator as EmployeeModel);
        const companionEntity = PersonMapper.modelToEntity(model.companion as PersonModel);
        return new VisitEntity({
            code: model.code,
            sequenceNumber: model.sequenceNumber,
            kinship: model.kinship,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            // creator: employeeEntity,
            patient: patientEntity,
            companion: companionEntity,
        });
    }
}

export default VisitMapper;
