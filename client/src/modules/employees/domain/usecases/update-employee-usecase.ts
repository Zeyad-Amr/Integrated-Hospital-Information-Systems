import BaseUseCase from "@/core/base/base-usecase";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { UpdateEmployeeUseCaseParameters } from "./usecase-params";

class UpdateEmployeeUseCase
    implements BaseUseCase<boolean, UpdateEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: UpdateEmployeeUseCaseParameters): Promise<boolean> {
        return await this.baseEmployeeRepository.updateEmployee(param.employee);
    }
}

export default UpdateEmployeeUseCase;
