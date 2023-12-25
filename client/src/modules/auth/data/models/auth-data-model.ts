import AuthInterface from '../../domain/interfaces/auth-interface';

export default class AuthDataModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: AuthInterface): any {
        return {
            username: entity.username,
            password: entity.password,
            email: entity.email,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AuthInterface {
        return {
            username: json.username,
            password: json.password,
            email: json.email,
        };
    }
}
