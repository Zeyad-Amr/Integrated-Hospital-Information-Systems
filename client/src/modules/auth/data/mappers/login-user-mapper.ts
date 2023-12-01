
import AuthDataModel from "../models/auth-data-model";
import AuthInterface from "../../domain/interfaces/auth-interface";

class AuthDataMapper {
    static toModel(entity: AuthInterface): AuthDataModel {
        return new AuthDataModel({
            username: entity.username,
            password: entity.password,
        });
    }

    static fromModel(model: AuthDataModel): AuthInterface {
        return {
            username: model.username,
            password: model.password,
        };
    }
}

export default AuthDataMapper;
