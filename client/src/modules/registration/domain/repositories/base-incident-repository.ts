import IncidentInterface from "../interfaces/visit-interface";

abstract class BaseIncidentRepository {
    abstract createIncident(visit: IncidentInterface): Promise<IncidentInterface>;
    // abstract getAllIncidents(): Promise<IncidentInterface[]>;
    // abstract getIncidentById(visitcode: string): Promise<IncidentInterface>;
}

export default BaseIncidentRepository;