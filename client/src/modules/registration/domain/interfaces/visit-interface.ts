import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { AdditionalDataInterface } from "./additional-data-interface";

export interface CompanionInterface extends PersonInterface {
    kinship?: number;
}
interface VisitInterface {
    code?: string;
    sequenceNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
    patient?: PersonInterface;
    companion?: CompanionInterface;
    additionalInfo?: AdditionalDataInterface
}

export default VisitInterface;
