import AuthDataEntity from '../../domain/entities/auth-data-entity';

export default class AuthDataModel extends AuthDataEntity {
    constructor(data: {
        username: string;
        password: string;
    }) {
        super(data);
    }

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    toJson(): any {
        return {
            username: this.username,
            password: this.password,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AuthDataModel {
        return new AuthDataModel({
            username: json.username,
            password: json.password,
        });
    }
}
