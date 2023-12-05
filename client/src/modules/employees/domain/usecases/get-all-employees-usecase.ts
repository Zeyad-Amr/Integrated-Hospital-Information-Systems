import BaseUseCase from "@/core/base/base-usecase";
import EmployeeEntity from "../entities/employee-entity";
import BaseEmployeeRepository from "../repositories/base-employee-repository";

class GetAllEmployeesUseCase
    implements BaseUseCase<EmployeeEntity[], void> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(): Promise<EmployeeEntity[]> {
        return await this.baseEmployeeRepository.getAllEmployees();
    }
}

export default GetAllEmployeesUseCase;
