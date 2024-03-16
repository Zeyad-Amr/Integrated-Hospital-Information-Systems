import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";

interface CompanionInterface extends PersonInterface {
    kinship?: number;
}

export default CompanionInterface;