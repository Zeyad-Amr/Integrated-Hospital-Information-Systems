import BaseUseCase from "@/core/base/base-usecase";
import { UpdateVisitUseCaseParameters } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";

class UpdateVisitUseCase
    implements BaseUseCase<boolean, UpdateVisitUseCaseParameters> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(param: UpdateVisitUseCaseParameters): Promise<boolean> {
        return await this.baseVisitsRepository.updateVisit(param.visit);
    }
}

export default UpdateVisitUseCase;