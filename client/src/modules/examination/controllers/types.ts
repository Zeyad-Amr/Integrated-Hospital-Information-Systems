//* Define Types of different initialStates

import { PaginatedList } from "@/core/api";
import { ComplaintsInterface } from "../interfaces/complaints-interface";

export interface TestState {
    test : string;
    loading: boolean;
    error: string;
}

export interface ComplaintsState {
    complaints: PaginatedList<ComplaintsInterface>;
    currentComplaint: ComplaintsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
  }