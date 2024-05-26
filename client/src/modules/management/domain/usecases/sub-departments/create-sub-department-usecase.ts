import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";
import { SubDepartmentsInterface } from "../../interfaces/sub-departments-interface";

class CreateSubDepartmentUseCase
    implements BaseUseCase<boolean, SubDepartmentsInterface> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(data: SubDepartmentsInterface): Promise<boolean> {
        return await this.baseSubDepartmentsRepository.createSubDepartment(data);
    }
}

export default CreateSubDepartmentUseCase;


