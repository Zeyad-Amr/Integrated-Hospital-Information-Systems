import BaseUseCase from "@/core/base/base-usecase";
import BaseLookupsRepository from "../repositories/base-lookups-repository";
import { NoParams } from "@/modules/registration/domain/usecases/visit";
import { LookupsInterface } from "../interfaces/lookups-interface";

class GetLookupsUseCase
    implements BaseUseCase<LookupsInterface, NoParams> {
    constructor(private baseLookupsRepository: BaseLookupsRepository) { }

    async call(): Promise<LookupsInterface> {
        return await this.baseLookupsRepository.getLookups();

    }
}

export default GetLookupsUseCase;


