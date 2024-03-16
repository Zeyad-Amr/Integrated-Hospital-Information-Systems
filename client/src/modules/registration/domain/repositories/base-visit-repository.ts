import { FilterQuery } from "@/core/api";
import VisitInterface from "../interfaces/visit-interface";

abstract class BaseVisitRepository {
    abstract createVisit(visit: VisitInterface): Promise<VisitInterface>;
    abstract updateVisit(visit: VisitInterface): Promise<boolean>;
    abstract getAllAnonymousVisits(filters: FilterQuery[]): Promise<VisitInterface[]>;
    abstract getVisitByCode(visitcode: string): Promise<VisitInterface>;
}

export default BaseVisitRepository;