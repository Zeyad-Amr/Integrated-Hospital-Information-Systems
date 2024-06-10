//* Define Types of different initialStates

import { PaginatedList } from "@/core/api";
import { AllergiesInterface } from "../interfaces/allergies-interface";

export interface AllergiesState {
    allergies: PaginatedList<AllergiesInterface>;
    currentAllergy: AllergiesInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
