import BaseUseCase from "@/core/base/base-usecase";
import { GetVisitByCodeUseCaseParameters } from "./usecase-params";
import BaseVisitsRepository from "../repositories/base-visits-repository";
import VisitEntity from "../entities/visit-entity";

class GetVisitByCodeUseCase
    implements BaseUseCase<VisitEntity, GetVisitByCodeUseCaseParameters> {
    constructor(private baseVisitsRepository: BaseVisitsRepository) { }

    async call(param: GetVisitByCodeUseCaseParameters): Promise<VisitEntity> {
        return await this.baseVisitsRepository.getVisitByCode(param.visitcode);
    }
}

export default GetVisitByCodeUseCase;