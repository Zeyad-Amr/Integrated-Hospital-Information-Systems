import VisitInterface from "../../domain/interfaces/visit-interface";

// Define the initial state using that type
export interface VisitsState {
    visits: VisitInterface[];
    currentVisit: VisitInterface;
    loading: boolean;
    error: string;
}