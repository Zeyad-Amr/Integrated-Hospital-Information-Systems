import { ErrorResponse } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import VisitEntity from "../entities/visit-entity";

abstract class BaseVisitsRepository {
    abstract createVisit(visit: VisitEntity): Promise<Either<ErrorResponse, VisitEntity>>;
    abstract updateVisit(visit: VisitEntity): Promise<Either<ErrorResponse, boolean>>;
    abstract getAllAnonymousVisits(): Promise<Either<ErrorResponse, VisitEntity[]>>;
    abstract getVisitByCode(visitcode: string): Promise<Either<ErrorResponse, VisitEntity>>;
}

export default BaseVisitsRepository;