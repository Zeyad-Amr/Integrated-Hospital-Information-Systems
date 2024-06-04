import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";
import { SubDepartmentInterface } from "../../interfaces/sub-departments-interface";

class CreateSubDepartmentUseCase
    implements BaseUseCase<boolean, SubDepartmentInterface> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(data: SubDepartmentInterface): Promise<boolean> {
        return await this.baseSubDepartmentsRepository.createSubDepartment(data);
    }
}

export default CreateSubDepartmentUseCase;


