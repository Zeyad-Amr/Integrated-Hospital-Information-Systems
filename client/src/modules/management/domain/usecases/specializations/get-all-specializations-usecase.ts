import BaseUseCase from "@/core/base/base-usecase";
import SpecializationInterface from "../../interfaces/specialization -interface";
import BaseSpecializationRepository from "../../repositories/base-specialization-repository";
import { FilterQuery, PaginatedList } from "@/core/api";

class GetAllSpecializationsUseCase
    implements BaseUseCase<PaginatedList<SpecializationInterface>, FilterQuery[]> {
    constructor(private baseSpecializationRepository: BaseSpecializationRepository) { }

    async call(params: FilterQuery[]): Promise<PaginatedList<SpecializationInterface>> {
        return await this.baseSpecializationRepository.getAllSpecializations(params);
    }
}

export default GetAllSpecializationsUseCase;
