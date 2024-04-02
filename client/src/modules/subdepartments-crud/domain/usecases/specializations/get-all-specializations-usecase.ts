import BaseUseCase from "@/core/base/base-usecase";
import SpecializationInterface from "../../interfaces/specialization -interface";
import BaseSpecializationRepository from "../../repositories/base-specialization-repository";

class GetAllSpecializationsUseCase
    implements BaseUseCase<SpecializationInterface[], void> {
    constructor(private baseSpecializationRepository: BaseSpecializationRepository) { }

    async call(): Promise<SpecializationInterface[]> {
        return await this.baseSpecializationRepository.getAllSpecializations();
    }
}

export default GetAllSpecializationsUseCase;
