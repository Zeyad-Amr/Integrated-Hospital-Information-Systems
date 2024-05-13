import BaseUseCase from "@/core/base/base-usecase";
import { CreateSpecializationUseCaseParameters } from "./usecase-params";
import BaseSpecializationRepository from "../../repositories/base-specialization-repository";

class CreateSpecializationUseCase
    implements BaseUseCase<boolean, CreateSpecializationUseCaseParameters> {
    constructor(private baseSpecializationRepository: BaseSpecializationRepository) { }

    async call(param: CreateSpecializationUseCaseParameters): Promise<boolean> {
        return await this.baseSpecializationRepository.createSpecialization(param.specialization);
    }
}

export default CreateSpecializationUseCase;


