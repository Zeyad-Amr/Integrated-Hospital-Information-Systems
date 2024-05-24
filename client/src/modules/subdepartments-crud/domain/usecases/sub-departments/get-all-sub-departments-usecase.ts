import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";
import { SubDepartmentsInterface } from "../../interfaces/sub-departments-interface";

class GetAllSubDepartmentsUseCase
    implements BaseUseCase<SubDepartmentsInterface[], void> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(): Promise<SubDepartmentsInterface[]> {
        return await this.baseSubDepartmentsRepository.getAllSubDepartments();
    }
}

export default GetAllSubDepartmentsUseCase;
