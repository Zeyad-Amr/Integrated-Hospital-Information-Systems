import BaseUseCase from "@/core/base/base-usecase";
import { UpdateSpecializationUseCaseParameters } from "./usecase-params";
import BaseSpecializationRepository from "../../repositories/base-specialization-repository";

class UpdateSpecializationUseCase
    implements BaseUseCase<boolean, UpdateSpecializationUseCaseParameters> {
    constructor(private baseSpecializationRepository: BaseSpecializationRepository) { }

    async call(param: UpdateSpecializationUseCaseParameters): Promise<boolean> {
        return await this.baseSpecializationRepository.updateSpecialization(param.specialization);
    }
}

export default UpdateSpecializationUseCase;
