import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { AdditionalDataInterface } from "./additional-data-interface";
import { CompanionInterface } from "./companion-interface";


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
