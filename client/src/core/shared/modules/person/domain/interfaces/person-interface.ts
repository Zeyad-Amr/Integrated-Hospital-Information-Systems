
export default interface PersonInterface {
    id?: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    fourthName?: string;
    SSN?: string;
    verificationMethod?: number;
    gender?: number;
    birthDate?: string | Date;
    phone?: string;
    governate?: number;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
