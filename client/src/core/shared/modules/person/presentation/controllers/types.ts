import PersonInterface from "../../domain/interfaces/person-interface";

export interface PersonState {
    person: PersonInterface;
    loading: boolean;
    error: string;
}