import VisitEntity from '../../domain/entities/visit-entity';
import PersonModel from '../../../auth/data/models/person-model';
import VisitInterface from '../../domain/interfaces/visit-interface';

export default class VisitModel extends VisitEntity {
    constructor(data: VisitInterface) {
        super(data);
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
            patient: PersonModel.fromJson(json.patient),
            companion: PersonModel.fromJson(json.companion),
        });
    }
}
