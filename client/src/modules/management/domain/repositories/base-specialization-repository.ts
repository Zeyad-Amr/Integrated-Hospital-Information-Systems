import { FilterQuery, PaginatedList } from "@/core/api";
import SpecializationInterface from "../interfaces/specialization -interface";

abstract class BaseSpecializationRepository {
    abstract createSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract updateSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract getAllSpecializations(filters: FilterQuery[]): Promise<PaginatedList<SpecializationInterface>>;
    abstract getSpecializationById(specializationId: string): Promise<SpecializationInterface>;
    abstract deleteSpecializationById(specializationId: string): Promise<boolean>;
}

export default BaseSpecializationRepository;