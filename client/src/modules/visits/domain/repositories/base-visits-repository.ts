import VisitEntity from "../entities/visit-entity";

abstract class BaseVisitsRepository {
    abstract createVisit(visit: VisitEntity): Promise<VisitEntity>;
    abstract updateVisit(visit: VisitEntity): Promise<boolean>;
    abstract getAllAnonymousVisits(): Promise<VisitEntity[]>;
    abstract getVisitByCode(visitcode: string): Promise<VisitEntity>;
}

export default BaseVisitsRepository;