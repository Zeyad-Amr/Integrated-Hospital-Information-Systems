
import BaseUseCase from "@/core/base/base-usecase";
import BaseRegistrationRepository from "../../repositories/base-visit-repository";
import VisitInterface from "../../interfaces/visit-interface";
import { FilterQueryParam } from "@/core/api";

class GetAnonymousVisitUseCase
    implements BaseUseCase<VisitInterface[], FilterQueryParam[]> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(params: FilterQueryParam[]): Promise<VisitInterface[]> {
        return await this.baseRegistrationRepository.getAllAnonymousVisits(params);
    }
}

export default GetAnonymousVisitUseCase;