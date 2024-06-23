// import BaseUseCase from "@/core/base/base-usecase";
import { TriageTransferInterface } from "../interfaces/triageAX-interface";
import BaseTriageAXRepository from "../repositories/base-triageAX-repository";

class CreateTriageAXUseCase {
    constructor(private triageAXRepository: BaseTriageAXRepository) { }

    async call(data: TriageTransferInterface, visitCode: string): Promise<void> {
        await this.triageAXRepository.createTriageTransfer(data, visitCode);
    }
}

export default CreateTriageAXUseCase;


