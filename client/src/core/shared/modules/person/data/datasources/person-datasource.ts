import { ApiClient, Endpoints } from "@/core/api";
import PersonInterface from "../../domain/interfaces/person-interface";
import PersonModel from "../models/person-model";

abstract class BasePersonDataSource {
    abstract getPerson(ssn: string): Promise<PersonInterface>;

}

class PersonDataSource extends BasePersonDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async getPerson(ssn: string): Promise<PersonInterface> {
        const response = await this.apiClient.get(Endpoints.person.details, { pathVariables: { ssn } });
        console.log(response.data);

        return response.data
    }

}

export { BasePersonDataSource, PersonDataSource };