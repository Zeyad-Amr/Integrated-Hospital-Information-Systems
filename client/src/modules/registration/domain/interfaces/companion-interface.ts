import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";

export interface CompanionInterface extends PersonInterface {
    kinship?: number;
}
