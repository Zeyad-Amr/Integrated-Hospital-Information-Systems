export default class StaffEntity {
    private name: string;
    private ssn: string;
    private email: string;
    private phone: string;
    private role: string;

    constructor(data: {
        name: string;
        ssn: string;
        email: string;
        phone: string;
        role: string;
    }) {
        this.name = data.name;
        this.ssn = data.ssn;
        this.email = data.email;
        this.phone = data.phone;
        this.role = data.role;
    }

    // Getter methods
    getName(): string {
        return this.name;
    }

    getSSN(): string {
        return this.ssn;
    }

    getEmail(): string {
        return this.email;
    }

    getPhone(): string {
        return this.phone;
    }

    getRole(): string {
        return this.role;
    }
}
