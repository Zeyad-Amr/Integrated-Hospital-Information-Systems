import BaseUseCase from "@/core/base/base-usecase";
import EmployeeEntity from "../entities/employee-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { UpdateEmployeeUseCaseParameters } from "./usecase-params";

class UpdateEmployeeUseCase
    implements BaseUseCase<EmployeeEntity | null, UpdateEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: UpdateEmployeeUseCaseParameters): Promise<Either<ErrorMessage, EmployeeEntity | null>> {
        return await this.baseEmployeeRepository.updateEmployee(param.employee, param.authData);
    }
}

export default UpdateEmployeeUseCase;
