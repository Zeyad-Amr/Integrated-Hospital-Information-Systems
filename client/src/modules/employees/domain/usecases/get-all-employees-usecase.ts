import BaseUseCase from "@/core/base/base-usecase";
import EmployeeEntity from "../entities/employee-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseEmployeeRepository from "../repositories/base-employee-repository";

class GetAllEmployeesUseCase
    implements BaseUseCase<EmployeeEntity[], void> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(): Promise<Either<ErrorMessage, EmployeeEntity[]>> {
        return await this.baseEmployeeRepository.getAllEmployees();
    }
}

export default GetAllEmployeesUseCase;
