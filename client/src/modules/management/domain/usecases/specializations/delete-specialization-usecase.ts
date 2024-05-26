import BaseUseCase from "@/core/base/base-usecase";
import { DeleteSpecializationUseCaseParameters } from "./usecase-params";
import BaseSpecializationRepository from "../../repositories/base-specialization-repository";

class DeleteSpecializationUseCase
    implements BaseUseCase<boolean, DeleteSpecializationUseCaseParameters> {
    constructor(private baseSpecializationRepository: BaseSpecializationRepository) { }

    async call(param: DeleteSpecializationUseCaseParameters): Promise<boolean> {
        return await this.baseSpecializationRepository.deleteSpecializationById(param.id);
    }
}

export default DeleteSpecializationUseCase;
