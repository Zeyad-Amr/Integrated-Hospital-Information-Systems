import UserInterface from "../../domain/interfaces/user-interface";
import PersonModel from "../models/person-model";
import UserModel from "../models/user-model";
import PersonMapper from "./person-mapper";

class UserMapper {
    static toModel(entity: UserInterface): UserModel {
        const personModel = PersonMapper.toModel(entity.person);
        return new UserModel({
            id: entity.id,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            createdById: entity.createdById,
            person: personModel,
        });
    }

    static fromModel(model: UserModel): UserInterface {
        const personEntity = PersonMapper.fromModel(model.person as PersonModel);
        return {
            id: model.id,
            role: model.role,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            createdById: model.createdById,
            person: personEntity,
        };
    }
}

export default UserMapper;
