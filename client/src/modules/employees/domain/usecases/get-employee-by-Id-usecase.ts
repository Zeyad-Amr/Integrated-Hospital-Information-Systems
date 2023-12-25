import BaseUseCase from "@/core/base/base-usecase";
import EmployeeInterface from "../interfaces/employee-interface";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { GetEmployeeByIdUseCaseParameters } from "./usecase-params";

class GetEmployeeByIdUseCase
    implements BaseUseCase<EmployeeInterface, GetEmployeeByIdUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: GetEmployeeByIdUseCaseParameters): Promise<EmployeeInterface> {
        return await this.baseEmployeeRepository.getEmployeeById(param.id);

    }
}

export default GetEmployeeByIdUseCase;


