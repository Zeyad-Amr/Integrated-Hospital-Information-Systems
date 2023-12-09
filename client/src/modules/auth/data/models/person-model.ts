import PersonEntity from '../../domain/entities/person-entity';
import PersonInterface from '../../domain/interfaces/person-interface';

export default class PersonModel extends PersonEntity {
    constructor(data: PersonInterface) {
        super(data);
    }

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    toJson(): any {
        return {
            // id: this.id,
            firstName: this.firstName,
            secondName: this.secondName,
            thirdName: this.thirdName,
            fourthName: this.fourthName,
            SSN: this.SSN,
            verificationMethod: this.verificationMethod,
            gender: this.gender,
            birthDate: this.birthDate,
            phone: this.phone,
            email: this.email,
            governate: this.governate,
            address: this.address,
            // createdAt: this.createdAt,
            // updatedAt: this.updatedAt,
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): PersonModel {
        return new PersonModel({
            id: json.id,
            firstName: json.firstName,
            secondName: json.secondName,
            thirdName: json.thirdName,
            fourthName: json.fourthName,
            SSN: json.SSN,
            verificationMethod: json.verificationMethod,
            gender: json.gender,
            birthDate: new Date(json.birthDate),
            phone: json.phone,
            email: json.email,
            governate: json.governate,
            address: json.address,
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt),
        });
    }
}
