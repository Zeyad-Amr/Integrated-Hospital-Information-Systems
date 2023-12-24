import BaseUseCase from "@/core/base/base-usecase";
import EmployeeInterface from "../interfaces/employee-interface";
import BaseEmployeeRepository from "../repositories/base-employee-repository";

class GetAllEmployeesUseCase
    implements BaseUseCase<EmployeeInterface[], void> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(): Promise<EmployeeInterface[]> {
        return await this.baseEmployeeRepository.getAllEmployees();
    }
}

export default GetAllEmployeesUseCase;
