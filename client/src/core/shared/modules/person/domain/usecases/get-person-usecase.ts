import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "@/modules/registration/domain/usecases";
import PersonInterface from "../interfaces/person-interface";
import BasePersonRepository from "../repositories/base-person-repository";

export default class GetPersonUseCase
    implements BaseUseCase<PersonInterface, NoParams> {
    constructor(private basePersonRepository: BasePersonRepository) { }

    async call(ssn: string): Promise<PersonInterface> {
        return await this.basePersonRepository.getPerson(ssn);

    }
}



