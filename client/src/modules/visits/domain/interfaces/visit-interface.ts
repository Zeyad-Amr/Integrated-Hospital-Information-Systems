import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { AdditionalDataInterface } from "./additional-data-interface";

interface VisitInterface {
    code?: string;
    sequenceNumber?: string;
    kinship?: number;
    createdAt?: Date;
    updatedAt?: Date;
    patient?: PersonInterface;
    companion?: PersonInterface;
    additionalInfo?: AdditionalDataInterface
}

export default VisitInterface;
