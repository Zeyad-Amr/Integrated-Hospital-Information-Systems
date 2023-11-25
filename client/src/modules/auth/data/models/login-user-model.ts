import LoginUserEntity from '../../domain/entities/login-user-entity';

export default class LoginUserModel extends LoginUserEntity {
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
    static fromJson(json: any): LoginUserModel {
        return new LoginUserModel({
            username: json.username,
            password: json.password,
        });
    }
}
