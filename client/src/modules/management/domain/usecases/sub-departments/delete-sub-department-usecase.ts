import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";

class DeleteSubDepartmentUseCase
    implements BaseUseCase<boolean, string> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(id: string): Promise<boolean> {
        return await this.baseSubDepartmentsRepository.deleteSubDepartmentById(id);
    }
}

export default DeleteSubDepartmentUseCase;
