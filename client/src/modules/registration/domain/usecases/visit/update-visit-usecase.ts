import BaseUseCase from "@/core/base/base-usecase";
import { UpdateVisitUseCaseParameters } from "./usecase-params";
import BaseRegistrationRepository from "../../repositories/base-visit-repository";

class UpdateVisitUseCase
    implements BaseUseCase<boolean, UpdateVisitUseCaseParameters> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(param: UpdateVisitUseCaseParameters): Promise<boolean> {
        return await this.baseRegistrationRepository.updateVisit(param.visit);
    }
}

export default UpdateVisitUseCase;