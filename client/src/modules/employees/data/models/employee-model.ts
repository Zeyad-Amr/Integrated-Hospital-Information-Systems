import AuthDataModel from '@/modules/auth/data/models/auth-data-model';
import UserModel from '@/modules/auth/data/models/user-model';

export default class EmployeeModel extends UserModel {
    constructor(data: {
        id: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        personID: string;
        createdById: string | null;
        person: {
            id: string;
            firstName: string;
            secondName: string;
            thirdName: string;
            fourthName: string;
            SSN: string;
            verificationMethod: string;
            gender: string;
            birthDate: Date;
            phone: string;
            email: string;
            governate: string;
            address: string;
            createdAt: Date;
            updatedAt: Date;
        };

    }) {
        super(data);

    }

    //* --------------------- Serialization: Convert the model to JSON ---------------------
    toJson(): any {
        const baseJson = super.toJson(); // Get JSON data from UserModel
        return {
            ...baseJson,
        };
    }

    toJsonWithAuthData(authData: AuthDataModel): any {
        return {
            personalData: this.toJson().person,
            auth: authData.toJson(),
            role: this.role
        };
    }

    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): EmployeeModel {
        const baseModel = super.fromJson(json); // Create a UserModel from the base class
        const {  /* other employee-specific data */ } = json;

        return new EmployeeModel({
            id: baseModel.id,
            role: baseModel.role,
            createdAt: baseModel.createdAt,
            updatedAt: baseModel.updatedAt,
            personID: baseModel.personID,
            createdById: baseModel.createdById,
            person: baseModel.person,
        });
    }

}
