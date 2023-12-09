import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitInterface from "../interfaces/visit-interface";

class GetAnonymousVisitsUseCase
    implements BaseUseCase<VisitInterface[], NoParams> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(): Promise<VisitInterface[]> {
        return await this.baseVisitsRepository.getAllAnonymousVisits();
    }
}

export default GetAnonymousVisitsUseCase;