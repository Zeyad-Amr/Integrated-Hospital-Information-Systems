import BaseUseCase from "@/core/base/base-usecase";
import BaseRegistrationRepository from "../../repositories/base-visit-repository";
import { CompleteVisitInterface } from "../../interfaces/complete-visit-interface";

class UpdateVisitUseCase
    implements BaseUseCase<boolean, CompleteVisitInterface> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(data: CompleteVisitInterface): Promise<boolean> {
        return await this.baseRegistrationRepository.updateVisit(data);
    }
}

export default UpdateVisitUseCase;