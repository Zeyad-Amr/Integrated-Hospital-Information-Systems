import UserEntity from "@/modules/auth/domain/entities/user-entity";

export default class EmployeeEntity extends UserEntity {
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
        super(data); // Call the constructor of the base class (UserEntity)

    }

    //* --------------------- Getters ---------------------

    //* --------------------- Setters ---------------------

    //* --------------------- Methods ---------------------
}
