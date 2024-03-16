import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { AdditionalDataInterface } from "./additional-data-interface";
import CompanionInterface from "./companion-interface";

/**
 * @interface VisitInterface
 * @description The interface for the Visit entity
 * @property code: string
 * @property sequenceNumber: string
 * @property createdAt: Date
 * @property updatedAt: Date
 * @property patient: PersonInterface
 * @property companion: CompanionInterface
 * @property additionalInfo: AdditionalDataInterface
 */
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
