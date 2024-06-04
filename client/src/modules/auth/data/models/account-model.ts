import { AccountInterface } from '../../domain/interfaces/account-interface';
import UserModel from './user-model';

export default class AccountModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): AccountInterface {
        return {
            user: UserModel.fromJson(json),
            permissions: [],
        };
    }
}
