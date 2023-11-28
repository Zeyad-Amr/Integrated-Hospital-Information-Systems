import BaseUseCase from "@/core/base/base-usecase";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import { UpdateVisitUseCaseParameters } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";

class UpdateVisitUseCase
    implements BaseUseCase<boolean, UpdateVisitUseCaseParameters> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(param: UpdateVisitUseCaseParameters): Promise<Either<ErrorMessage, boolean>> {
        return await this.baseVisitsRepository.updateVisit(param.visit);
    }
}

export default UpdateVisitUseCase;