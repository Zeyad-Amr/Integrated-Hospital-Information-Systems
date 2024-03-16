import BaseUseCase from "@/core/base/base-usecase";
import { GetVisitByCodeUseCaseParameters } from "./usecase-params";
import BaseRegistrationRepository from "../repositories/base-registration-repository";
import VisitInterface from "../interfaces/visit-interface";

class GetVisitByCodeUseCase
    implements BaseUseCase<VisitInterface, GetVisitByCodeUseCaseParameters> {
    constructor(private baseRegistrationRepository: BaseRegistrationRepository) { }

    async call(param: GetVisitByCodeUseCaseParameters): Promise<VisitInterface> {
        return await this.baseRegistrationRepository.getVisitByCode(param.visitcode);
    }
}

export default GetVisitByCodeUseCase;