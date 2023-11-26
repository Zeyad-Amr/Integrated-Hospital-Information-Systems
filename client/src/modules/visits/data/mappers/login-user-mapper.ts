
import AuthDataModel from "../models/auth-data-model";
import AuthDataEntity from "../../domain/entities/visit-entity";

class AuthDataMapper {
    static entityToModel(entity: AuthDataEntity): AuthDataModel {
        return new AuthDataModel({
            username: entity.username,
            password: entity.password,
        });
    }

    static modelToEntity(model: AuthDataModel): AuthDataEntity {
        return new AuthDataEntity({
            username: model.username,
            password: model.password,
        });
    }
}

export default AuthDataMapper;
