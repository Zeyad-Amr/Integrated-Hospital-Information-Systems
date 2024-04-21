import BaseUseCase from "@/core/base/base-usecase";
import BaseDepartmentsRepository from "../../repositories/base-departments-repository";
import DepartmentsInterface from "../../interfaces/departments-interface";

class GetAllDepartmentsUseCase
    implements BaseUseCase<DepartmentsInterface[], void> {
    constructor(private baseDepartmentsRepository: BaseDepartmentsRepository) { }

    async call(): Promise<DepartmentsInterface[]> {
        return await this.baseDepartmentsRepository.getAllDepartments();
    }
}

export default GetAllDepartmentsUseCase;
