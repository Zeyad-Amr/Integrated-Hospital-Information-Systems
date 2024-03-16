import { FilterQueryParam } from "@/core/api";
import VisitInterface from "../interfaces/visit-interface";

abstract class BaseRegistrationRepository {
    abstract createVisit(visit: VisitInterface): Promise<VisitInterface>;
    abstract updateVisit(visit: VisitInterface): Promise<boolean>;
    abstract getAllAnonymousVisits(filters: FilterQueryParam[]): Promise<VisitInterface[]>;
    abstract getVisitByCode(visitcode: string): Promise<VisitInterface>;
}

export default BaseRegistrationRepository;