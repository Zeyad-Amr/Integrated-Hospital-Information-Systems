import UserEntity from "../../domain/entities/user-entity";
import PersonModel from "../models/person-model";
import UserModel from "../models/user-model";
import PersonMapper from "./person-mapper";

class UserMapper {
    static entityToModel(entity: UserEntity): UserModel {
        const personModel = PersonMapper.entityToModel(entity.person);
        return new UserModel({
            id: entity.id,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            personID: entity.personID,
            createdById: entity.createdById,
            person: personModel,
        });
    }

    static modelToEntity(model: UserModel): UserEntity {
        const personEntity = PersonMapper.modelToEntity(model.person as PersonModel);
        return new UserEntity({
            id: model.id,
            role: model.role,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            personID: model.personID,
            createdById: model.createdById,
            person: personEntity,
        });
    }
}

export default UserMapper;
