import BaseUseCase from "@/core/base/base-usecase";
import BaseIncidentRepository from "../../repositories/base-incident-repository";
import IncidentInterface from "../../interfaces/incident-interface";

export default class CreateIncidentUseCase
    implements BaseUseCase<IncidentInterface, IncidentInterface> {
    constructor(private baseIncidentRepository: BaseIncidentRepository) { }

    async call(data: IncidentInterface): Promise<IncidentInterface> {
        return await this.baseIncidentRepository.createIncident(data);
    }
}

