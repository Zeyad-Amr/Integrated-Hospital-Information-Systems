// import BaseUseCase from "@/core/base/base-usecase";
import { TriageAXInterface } from "../interfaces/triageAX-interface";
import BaseTriageAXRepository from "../repositories/base-triageAX-repository";

class CreateTriageAXUseCase {
    constructor(private triageAXRepository: BaseTriageAXRepository) { }

    async call(data: TriageAXInterface, visitCode: string): Promise<void> {
        await this.triageAXRepository.createTriageAX(data, visitCode);
    }
}

export default CreateTriageAXUseCase;


