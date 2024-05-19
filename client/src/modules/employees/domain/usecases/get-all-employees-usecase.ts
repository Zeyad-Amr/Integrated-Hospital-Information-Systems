import BaseUseCase from "@/core/base/base-usecase";
import EmployeeInterface from "../interfaces/employee-interface";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { FilterQuery } from "@/core/api/filters";

class GetAllEmployeesUseCase
    implements BaseUseCase<EmployeeInterface[], FilterQuery[]> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(params: FilterQuery[]): Promise<EmployeeInterface[]> {
        return await this.baseEmployeeRepository.getAllEmployees(params);
    }
}

export default GetAllEmployeesUseCase;
