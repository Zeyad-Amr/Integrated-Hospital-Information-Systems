import BaseUseCase from "@/core/base/base-usecase";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import { NoParams } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitEntity from "../entities/visit-entity";

class GetAnonymousVisitsUseCase
    implements BaseUseCase<VisitEntity[], NoParams> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(): Promise<Either<ErrorMessage, VisitEntity[]>> {
        return await this.baseVisitsRepository.getAllAnonymousVisits();
    }
}

export default GetAnonymousVisitsUseCase;