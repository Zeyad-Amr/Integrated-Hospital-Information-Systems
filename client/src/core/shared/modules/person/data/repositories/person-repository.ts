import { ErrorResponse, ErrorMessage } from "@/core/api";
import BasePersonRepository from "../../domain/repositories/base-person-repository";
import PersonInterface from "../../domain/interfaces/person-interface";
import { BasePersonDataSource } from "../datasources/person-datasource";

export default class PersonRepository extends BasePersonRepository {
    constructor(private basePersonDataSource: BasePersonDataSource) {
        super();
    }

    override async getPerson(ssn: string): Promise<PersonInterface> {
        try {
            console.log('Repo');
            const result = await this.basePersonDataSource.getPerson(ssn);
            console.log('Repo:', result);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getOcrData(): Promise<any> {
        try {
            console.log('Repo');
            const result = await this.basePersonDataSource.getOcrData();
            console.log('Repo:', result);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

