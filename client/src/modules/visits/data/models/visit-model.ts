import VisitEntity from '../../domain/entities/visit-entity';
import PersonModel from '../../../auth/data/models/person-model';
// import EmployeeModel from '../../../employees/data/models/employee-model';
export default class VisitModel extends VisitEntity {
    constructor(data: {
        code: string;
        sequenceNumber: number | null;
        kinship: string | null;
        createdAt: Date;
        updatedAt: Date;
        // creator: {
        //     id: string;
        //     role: string;
        //     createdAt: Date;
        //     updatedAt: Date;
        //     createdById: string | null;
        //     person: {
        //         id: string;
        //         firstName: string;
        //         secondName: string;
        //         thirdName: string;
        //         fourthName: string;
        //         SSN: string;
        //         verificationMethod: string;
        //         gender: string;
        //         birthDate: Date;
        //         phone: string;
        //         email: string;
        //         governate: string;
        //         address: string;
        //         createdAt: Date;
        //         updatedAt: Date;
        //     };
        // };
        patient: {
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
        companion: {
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
        // this.creator = new EmployeeModel(data.creator);
        this.patient = new PersonModel(data.patient);
        this.companion = new PersonModel(data.companion);
    }

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    toJson(): any {
        return {
            patient: (this.patient as PersonModel).toJson(),
            companion: (this.companion as PersonModel).toJson(),
            visit: {
                sequenceNumber: this.sequenceNumber,
                kinship: this.kinship,
            }
        };
    }

    toUpdateJson(): any {
        return {
            patient: (this.patient as PersonModel).toJson(),
            companion: (this.companion as PersonModel).toJson(),
            visitCode: this.code
        };
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): VisitModel {
        return new VisitModel({
            code: json.code,
            sequenceNumber: json.sequenceNumber,
            kinship: json.kinship,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
            // creator: EmployeeModel.fromJson(json.creator),
            patient: PersonModel.fromJson(json.patient),
            companion: PersonModel.fromJson(json.companion),
        });
    }
}
