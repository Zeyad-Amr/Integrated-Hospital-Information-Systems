import BaseUseCase from "@/core/base/base-usecase";
import EmployeeEntity from "../entities/employee-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { CreateEmployeeUseCaseParameters } from "./usecase-params";

class CreateEmployeeUseCase
    implements BaseUseCase<EmployeeEntity, CreateEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: CreateEmployeeUseCaseParameters): Promise<Either<ErrorMessage, EmployeeEntity>> {
        console.log('UseCase', param.employee);
        return await this.baseEmployeeRepository.createEmployee(param.employee, param.authData);
    }
}

export default CreateEmployeeUseCase;


