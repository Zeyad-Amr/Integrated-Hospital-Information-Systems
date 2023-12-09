import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";

interface VisitInterface {
    code?: string;
    sequenceNumber?: number;
    kinship?: string;
    createdAt?: Date;
    updatedAt?: Date;
    patient?: PersonInterface;
    companion?: PersonInterface;
}

export default VisitInterface;
