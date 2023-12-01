import BaseUseCase from "@/core/base/base-usecase";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseEmployeeRepository from "../repositories/base-employee-repository";
import { DeleteEmployeeUseCaseParameters } from "./usecase-params";

class DeleteEmployeeUseCase
    implements BaseUseCase<boolean, DeleteEmployeeUseCaseParameters> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(param: DeleteEmployeeUseCaseParameters): Promise<Either<ErrorMessage, boolean>> {
        return await this.baseEmployeeRepository.deleteEmployee(param.id);
    }
}

export default DeleteEmployeeUseCase;
