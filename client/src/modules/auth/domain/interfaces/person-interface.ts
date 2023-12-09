import { IGender, IIdentity } from "../data-values/interfaces";

export default interface PersonInterface {
    id?: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    fourthName?: string;
    SSN: string;
    verificationMethod: IIdentity;
    gender?: IGender
    birthDate?: Date;
    phone?: string;
    governate?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
