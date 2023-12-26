import BaseUseCase from "@/core/base/base-usecase";
import BaseEmployeeRepository from "../repositories/base-lookups-repository";
import { NoParams } from "@/modules/visits/domain/usecases";
import { LookupsInterface } from "../interfaces/lookups-interface";

class GetLookupsUseCase
    implements BaseUseCase<LookupsInterface, NoParams> {
    constructor(private baseEmployeeRepository: BaseEmployeeRepository) { }

    async call(): Promise<LookupsInterface> {
        return await this.baseEmployeeRepository.getLookups();

    }
}

export default GetLookupsUseCase;


