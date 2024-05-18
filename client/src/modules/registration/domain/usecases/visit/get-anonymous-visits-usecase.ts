
import BaseUseCase from "@/core/base/base-usecase";
import BaseRegistrationRepository from "../../repositories/base-visit-repository";
import VisitInterface from "../../interfaces/visit-interface";
import { FilterQuery, PaginatedList } from "@/core/api";

class GetAnonymousVisitUseCase
    implements BaseUseCase<PaginatedList<VisitInterface>, FilterQuery[]> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(params: FilterQuery[]): Promise<PaginatedList<VisitInterface>> {
        return await this.baseRegistrationRepository.getAllAnonymousVisits(params);
    }
}

export default GetAnonymousVisitUseCase;