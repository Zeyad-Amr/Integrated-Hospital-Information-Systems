import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "./usecase-params";
import BaseRegistrationRepository from "../../repositories/base-visit-repository";
import VisitInterface from "../../interfaces/visit-interface";

class GetAnonymousVisitUseCase
    implements BaseUseCase<VisitInterface[], NoParams> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(): Promise<VisitInterface[]> {
        return await this.baseRegistrationRepository.getAllAnonymousVisits();
    }
}

export default GetAnonymousVisitUseCase;