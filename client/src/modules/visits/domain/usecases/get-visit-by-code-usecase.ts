import BaseUseCase from "@/core/base/base-usecase";
import { GetVisitByCodeUseCaseParameters } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitInterface from "../interfaces/visit-interface";

class GetVisitByCodeUseCase
    implements BaseUseCase<VisitInterface, GetVisitByCodeUseCaseParameters> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(param: GetVisitByCodeUseCaseParameters): Promise<VisitInterface> {
        return await this.baseVisitsRepository.getVisitByCode(param.visitcode);
    }
}

export default GetVisitByCodeUseCase;