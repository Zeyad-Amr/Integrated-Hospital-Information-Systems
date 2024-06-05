
import BaseUseCase from "@/core/base/base-usecase";
import VisitInterface from "../../interfaces/visit-interface";
import { FilterQuery, PaginatedList } from "@/core/api";
import BaseIncidentRepository from "../../repositories/base-incident-repository";

class GetAllIncidentsUseCase
    implements BaseUseCase<PaginatedList<VisitInterface>, FilterQuery[]> {
    constructor(private baseIncidentRepository: BaseIncidentRepository) { }

    async call(params: FilterQuery[]): Promise<PaginatedList<VisitInterface>> {
        return await this.baseIncidentRepository.getAllIncidents(params);
    }
}

export default GetAllIncidentsUseCase;