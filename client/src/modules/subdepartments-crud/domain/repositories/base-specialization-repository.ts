import SpecializationInterface from "../interfaces/specialization -interface";

abstract class BaseSpecializationRepository {
    abstract createSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract updateSpecialization(specialization: SpecializationInterface): Promise<boolean>;
    abstract getAllSpecializations(): Promise<SpecializationInterface[]>;
    abstract getSpecializationById(specializationId: string): Promise<SpecializationInterface>;
    abstract deleteSpecializationById(specializationId: string): Promise<boolean>;
}

export default BaseSpecializationRepository;