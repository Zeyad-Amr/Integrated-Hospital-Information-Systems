import { IGender, IGovernate, IIdentity } from "../data-values/interfaces";

export default interface PersonInterface {
    id: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    fourthName?: string;
    SSN?: string;
    verificationMethod?: IIdentity;
    gender?: IGender
    birthDate?: Date;
    phone?: string;
    governate?: IGovernate;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
