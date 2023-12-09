import BaseUseCase from "@/core/base/base-usecase";
import { CreateVisitUseCaseParameters } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
// import VisitEntity from "../entities/visit-entity";
import VisitInterface from "../interfaces/visit-interface";

class CreateVisitUseCase
    implements BaseUseCase<VisitInterface, CreateVisitUseCaseParameters> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(param: CreateVisitUseCaseParameters): Promise<VisitInterface> {
        return await this.baseVisitsRepository.createVisit(param.visit);
    }
}

export default CreateVisitUseCase;