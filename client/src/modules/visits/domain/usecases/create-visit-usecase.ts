import BaseUseCase from "@/core/base/base-usecase";
import { CreateVisitUseCaseParameters } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitEntity from "../entities/visit-entity";

class CreateVisitUseCase
    implements BaseUseCase<VisitEntity, CreateVisitUseCaseParameters> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(param: CreateVisitUseCaseParameters): Promise<VisitEntity> {
        return await this.baseVisitsRepository.createVisit(param.visit);
    }
}

export default CreateVisitUseCase;