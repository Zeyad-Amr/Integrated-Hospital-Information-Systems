import BaseUseCase from "@/core/base/base-usecase";
import EmployeeEntity from "../entities/employee-entity";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { GetEmployeeByIdUseCaseParameters } from "./usecase-params";

class GetEmployeeByIdUseCase
    implements BaseUseCase<EmployeeEntity, GetEmployeeByIdUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: GetEmployeeByIdUseCaseParameters): Promise<EmployeeEntity> {
        return await this.baseEmployeeRepository.getEmployeeById(param.id);

    }
}

export default GetEmployeeByIdUseCase;


