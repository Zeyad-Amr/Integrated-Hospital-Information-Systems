import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitEntity from "../entities/visit-entity";

class GetAnonymousVisitsUseCase
    implements BaseUseCase<VisitEntity[], NoParams> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(): Promise<VisitEntity[]> {
        return await this.baseVisitsRepository.getAllAnonymousVisits();
    }
}

export default GetAnonymousVisitsUseCase;