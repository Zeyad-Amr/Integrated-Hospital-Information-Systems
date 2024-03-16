import BaseUseCase from "@/core/base/base-usecase";
import BaseRegistrationRepository from "../repositories/base-registration-repository";
import VisitInterface from "../interfaces/visit-interface";
import { FilterQueryParam } from "@/core/api";

class GetAnonymousVisitUseCase
    implements BaseUseCase<VisitInterface[], FilterQueryParam[]> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(param: FilterQueryParam[]): Promise<VisitInterface[]> {
        return await this.baseRegistrationRepository.getAllAnonymousVisits(param);
    }
}

export default GetAnonymousVisitUseCase;