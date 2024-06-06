import { TestInterface } from '../interfaces/test-interface';

export default class TestModel {

    //*   Default form values 
    //*  Form Schema

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: TestInterface): any {
        return {
            test: entity.test,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): TestInterface {
        return {
            id: json.id,
            test: json.name,
        };
    }
}
