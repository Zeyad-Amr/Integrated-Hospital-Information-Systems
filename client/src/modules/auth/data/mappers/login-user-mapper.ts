
import LoginUserModel from "../models/login-user-model";
import LoginUserEntity from "../../domain/entities/login-user-entity";

class LoginUserMapper {
    static entityToModel(entity: LoginUserEntity): LoginUserModel {
        return new LoginUserModel({
            username: entity.username,
            password: entity.password,
        });
    }

    static modelToEntity(model: LoginUserModel): LoginUserEntity {
        return new LoginUserEntity({
            username: model.username,
            password: model.password,
        });
    }
}

export default LoginUserMapper;
