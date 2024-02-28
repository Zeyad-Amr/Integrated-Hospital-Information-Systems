import BaseUseCase from "@/core/base/base-usecase";
import BaseRegistrationRepository from "../repositories/base-registration-repository";
import VisitInterface from "../interfaces/visit-interface";

class CreateVisitUseCase
    implements BaseUseCase<VisitInterface, VisitInterface> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(data: VisitInterface): Promise<VisitInterface> {
        return await this.baseRegistrationRepository.createVisit(data);
    }
}

export default CreateVisitUseCase;