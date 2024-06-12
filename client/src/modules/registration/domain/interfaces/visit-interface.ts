import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { AdditionalDataInterface } from "./additional-data-interface";
import { CompanionInterface } from "./companion-interface";
import { TransferDataInterface } from "./transfer-data-interface";


interface VisitInterface {
    code?: string;
    sequenceNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
    patientId?: string;
    patient?: PersonInterface;
    companion?: CompanionInterface;
    additionalInfo?: AdditionalDataInterface
    transfer?: TransferDataInterface
}

export default VisitInterface;
