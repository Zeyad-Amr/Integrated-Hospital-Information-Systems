import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";
import { AdditionalDataInterface } from "./additional-data-interface";
import { KinshipEnum } from "../data-values/enums";

interface VisitInterface {
    code?: string;
    sequenceNumber?: number;
    kinship?: KinshipEnum;
    createdAt?: Date;
    updatedAt?: Date;
    patient?: PersonInterface;
    companion?: PersonInterface;
    additionalInfo?: AdditionalDataInterface
}

export default VisitInterface;
