import { FilterQuery, PaginatedList } from "@/core/api";
import IncidentInterface from "../interfaces/visit-interface";
import VisitInterface from "../interfaces/visit-interface";

abstract class BaseIncidentRepository {
    abstract createIncident(visit: IncidentInterface): Promise<IncidentInterface>;
    abstract getAllIncidents(filters: FilterQuery[]): Promise<PaginatedList<VisitInterface>>;
}

export default BaseIncidentRepository;