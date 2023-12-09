import VisitModel from "../models/visit-model";
import PersonMapper from "../../../auth/data/mappers/person-mapper";
import PersonModel from "../../../auth/data/models/person-model";
import VisitInterface from "../../domain/interfaces/visit-interface";

class VisitMapper {

    static toModel(entity: VisitInterface): VisitModel {
        return new VisitModel({
            code: entity.code,
            sequenceNumber: entity.sequenceNumber,
            kinship: entity.kinship,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            patient: entity.patient === undefined ? undefined : PersonMapper.toModel(entity.patient),
            companion: entity.companion === undefined ? undefined : PersonMapper.toModel(entity.companion),
        });
    }

    static fromModel(model: VisitModel): VisitInterface {
        return {
            code: model.code ?? "",
            sequenceNumber: model.sequenceNumber ?? 0,
            kinship: model.kinship,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            patient: model.patient === undefined ? undefined : PersonMapper.fromModel(model.patient as PersonModel),
            companion: model.companion === undefined ? undefined : PersonMapper.fromModel(model.companion as PersonModel),
        };
    }
}

export default VisitMapper;
