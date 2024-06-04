import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";
import { SubDepartmentInterface } from "../../interfaces/sub-departments-interface";
import { FilterQuery, PaginatedList } from "@/core/api";

class GetAllSubDepartmentsUseCase
    implements BaseUseCase<PaginatedList<SubDepartmentInterface>, FilterQuery[]> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(params: FilterQuery[]): Promise<PaginatedList<SubDepartmentInterface>> {
        return await this.baseSubDepartmentsRepository.getAllSubDepartments(params);
    }
}

export default GetAllSubDepartmentsUseCase;
