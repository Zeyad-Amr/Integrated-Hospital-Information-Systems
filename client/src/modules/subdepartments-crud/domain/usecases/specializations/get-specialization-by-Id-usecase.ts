import BaseUseCase from "@/core/base/base-usecase";
import { GetSpecializationByIdUseCaseParameters } from "./usecase-params";
import SpecializationInterface from "../../interfaces/specialization -interface";
import BaseSpecializationRepository from "../../repositories/base-specialization-repository";

class GetSpecializationByIdUseCase
  implements BaseUseCase<SpecializationInterface, GetSpecializationByIdUseCaseParameters>
{
  constructor(private baseSpecializationRepository: BaseSpecializationRepository) {}

  async call(param: GetSpecializationByIdUseCaseParameters): Promise<SpecializationInterface> {
    return await this.baseSpecializationRepository.getSpecializationById(param.id);
  }
}

export default GetSpecializationByIdUseCase;
