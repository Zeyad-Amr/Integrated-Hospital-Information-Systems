import BaseUseCase from "@/core/base/base-usecase";
import SubDepartmentsInterface from "../../interfaces/sub-departments-interface";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";

class GetAllSubDepartmentsUseCase
    implements BaseUseCase<SubDepartmentsInterface[], void> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(): Promise<SubDepartmentsInterface[]> {
        return await this.baseSubDepartmentsRepository.getAllSubDepartments();
    }
}

export default GetAllSubDepartmentsUseCase;
