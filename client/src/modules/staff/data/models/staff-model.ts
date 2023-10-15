import StaffEntity from '../../domain/entities/staff-entity';
export default class StaffModel extends StaffEntity {
    constructor(data: {
        name: string;
        ssn: string;
        email: string;
        phone: string;
        role: string;
    }) {
        super(data);
    }

    // Serialization: Convert the model to JSON
    toJson(): string {
        return JSON.stringify({
            name: this.getName(),
            ssn: this.getSSN(),
            email: this.getEmail(),
            phone: this.getPhone(),
            role: this.getRole(),
        });
    }

    // Deserialization: Create a model from JSON data
    static fromJson(json: string): StaffModel {
        const data = JSON.parse(json);
        return new StaffModel(data);
    }
}