import BaseUseCase from "@/core/base/base-usecase";
import EmployeeEntity from "../entities/employee-entity";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { UpdateEmployeeUseCaseParameters } from "./usecase-params";

class UpdateEmployeeUseCase
    implements BaseUseCase<EmployeeEntity | null, UpdateEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: UpdateEmployeeUseCaseParameters): Promise<EmployeeEntity | null> {
        return await this.baseEmployeeRepository.updateEmployee(param.employee, param.authData);
    }
}

export default UpdateEmployeeUseCase;
