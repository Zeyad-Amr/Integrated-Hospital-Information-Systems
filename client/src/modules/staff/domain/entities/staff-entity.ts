export default class StaffEntity {
    private id: string;
    private name: string;
    private ssn: string;
    private email: string;
    private phone: string;
    private role: string;

    constructor(data: {
        id: string;
        name: string;
        ssn: string;
        email: string;
        phone: string;
        role: string;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.ssn = data.ssn;
        this.email = data.email;
        this.phone = data.phone;
        this.role = data.role;
    }

    // Getter methods
    getId(): string {
        return this.id;
    }

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


    // Setter methods
    setId(id: string): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setSSN(ssn: string): void {
        this.ssn = ssn;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setRole(role: string): void {
        this.role = role;
    }

}
