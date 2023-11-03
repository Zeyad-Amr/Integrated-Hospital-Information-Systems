import StaffEntity from '../../domain/entities/staff-entity';

export default class StaffModel extends StaffEntity {
    constructor(data: {
        id: string;
        name: string;
        ssn: string;
        email: string;
        phone: string;
        role: string;
    }) {
        super(data);
    }

    // Serialization: Convert the model to JSON
    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            ssn: this.ssn,
            email: this.email,
            phone: this.phone,
            role: this.role,
        };
    }

    // Deserialization: Create a model from JSON data
    static fromJson(json: any): StaffModel {
        return new StaffModel({
            id: json.id,
            name: json.name,
            ssn: json.ssn,
            email: json.email,
            phone: json.phone,
            role: json.role,
        });
    }
}
