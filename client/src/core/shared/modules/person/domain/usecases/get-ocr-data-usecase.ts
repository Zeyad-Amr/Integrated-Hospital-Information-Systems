import BaseUseCase from "@/core/base/base-usecase";
import { NoParams } from "@/modules/registration/domain/usecases/visit";
import BasePersonRepository from "../repositories/base-person-repository";

export default class GetOcrData
    implements BaseUseCase<any, NoParams> {
    constructor(private basePersonRepository: BasePersonRepository) { }

    async call(): Promise<any> {
        return await this.basePersonRepository.getOcrData();
    }
}



