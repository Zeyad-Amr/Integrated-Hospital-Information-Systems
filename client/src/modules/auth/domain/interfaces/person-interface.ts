import { GenderType, Governate, IdentityType } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";

export default interface PersonInterface {
    id?: string;
    firstName?: string;
    secondName?: string;
    thirdName?: string;
    fourthName?: string;
    SSN?: string;
    verificationMethod?: IdentityType;
    gender?: GenderType
    birthDate?: string;
    phone?: string;
    governate?: Governate;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
