import BaseUseCase from "@/core/base/base-usecase";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitInterface from "../interfaces/visit-interface";

class CreateVisitUseCase
    implements BaseUseCase<VisitInterface, VisitInterface> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(data: VisitInterface): Promise<VisitInterface> {
        return await this.baseVisitsRepository.createVisit(data);
    }
}

export default CreateVisitUseCase;