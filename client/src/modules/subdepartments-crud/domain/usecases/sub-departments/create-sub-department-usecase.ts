import BaseUseCase from "@/core/base/base-usecase";
import SubDepartmentsInterface from "../../interfaces/sub-departments-interface";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";

class CreateSubDepartmentUseCase
    implements BaseUseCase<boolean, SubDepartmentsInterface> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(data: SubDepartmentsInterface): Promise<boolean> {
        return await this.baseSubDepartmentsRepository.createSubDepartment(data);
    }
}

export default CreateSubDepartmentUseCase;


