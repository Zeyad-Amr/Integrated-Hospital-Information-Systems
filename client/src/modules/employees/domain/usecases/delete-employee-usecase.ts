import BaseUseCase from "@/core/base/base-usecase";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { DeleteEmployeeUseCaseParameters } from "./usecase-params";

class DeleteEmployeeUseCase
    implements BaseUseCase<boolean, DeleteEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: DeleteEmployeeUseCaseParameters): Promise<boolean> {
        return await this.baseEmployeeRepository.deleteEmployee(param.id);
    }
}

export default DeleteEmployeeUseCase;
