import VisitEntity from "../../domain/entities/visit-entity";

// Define the initial state using that type
export interface VisitsState {
    visits: VisitEntity[];
    currentVisit: VisitEntity;
    loading: boolean;
    error: string;
}