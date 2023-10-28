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
            id: this.getId(),
            name: this.getName(),
            ssn: this.getSSN(),
            email: this.getEmail(),
            phone: this.getPhone(),
            role: this.getRole(),
        };
    }

    // Deserialization: Create a model from JSON data
    static fromJson(json: any): StaffModel {
        const data = {
            id: json.id,
            name: json.name,
            ssn: json.ssn,
            email: json.email,
            phone: json.phone,
            role: json.role,
        };
        return new StaffModel(data);
    }
}