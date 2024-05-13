import DepartmentsInterface from '../../domain/interfaces/departments-interface';

export default class DepartmentsModel {

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): DepartmentsInterface {
        return {
            id: json.id,
            name: json.name,
        };
    }
}
