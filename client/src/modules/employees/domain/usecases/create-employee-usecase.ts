import BaseUseCase from "@/core/base/base-usecase";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { CreateEmployeeUseCaseParameters } from "./usecase-params";

class CreateEmployeeUseCase
    implements BaseUseCase<boolean, CreateEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: CreateEmployeeUseCaseParameters): Promise<boolean> {
        return await this.baseEmployeeRepository.createEmployee(param.employee);
    }
}

export default CreateEmployeeUseCase;


