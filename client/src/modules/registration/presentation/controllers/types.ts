import IncidentInterface from "../../domain/interfaces/incident-interface";
import VisitInterface from "../../domain/interfaces/visit-interface";

// Define the initial state using that type
export interface VisitsState {
    visits: VisitInterface[];
    total: number;
    currentVisit: VisitInterface;
    loading: boolean;
    error: string;
}

export interface IncidentState {
    incidents: IncidentInterface[];
    currentIncident: IncidentInterface;
    loading: boolean;
    error: string;
}