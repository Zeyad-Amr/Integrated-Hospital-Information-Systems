import BaseUseCase from "@/core/base/base-usecase";
import TriageAXInterface from "../interfaces/triageAX-interface";
import BaseTriageAXRepository from "../repositories/base-triageAX-repository";

class CreateTriageAXUseCase
    implements BaseUseCase<void, TriageAXInterface> {
    constructor(private baseEmployeeRepository: BaseTriageAXRepository) { }

    async call(data: TriageAXInterface): Promise<void> {
        await this.baseEmployeeRepository.createTriageAX(data);
    }
}

export default CreateTriageAXUseCase;


