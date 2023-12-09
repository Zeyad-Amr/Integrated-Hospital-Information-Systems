import UserEntity from '../../domain/entities/user-entity';
import UserInterface from '../../domain/interfaces/user-interface';
import PersonModel from './person-model';

export default class UserModel extends UserEntity {
    constructor(data: UserInterface) {
        super(data);
    }

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    toJson(): any {
        return {
            // id: this.id,
            role: this.role,
            // createdAt: this.createdAt,
            // updatedAt: this.updatedAt,
            createdById: this.createdById,
            person: (this.person as PersonModel).toJson(),
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): UserModel {
        return new UserModel({
            id: json.id,
            role: json.role,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            createdById: json.createdById,
            person: PersonModel.fromJson(json.person),
        });
    }
}
