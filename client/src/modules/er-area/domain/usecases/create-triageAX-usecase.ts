import BaseUseCase from "@/core/base/base-usecase";
import { TriageAXInterface } from "../interfaces/triageAX-interface";
import BaseTriageAXRepository from "../repositories/base-triageAX-repository";

class CreateTriageAXUseCase
    implements BaseUseCase<void, TriageAXInterface> {
    constructor(private triageAXRepository: BaseTriageAXRepository) { }

    async call(data: TriageAXInterface): Promise<void> {
        await this.triageAXRepository.createTriageAX(data);
    }
}

export default CreateTriageAXUseCase;


