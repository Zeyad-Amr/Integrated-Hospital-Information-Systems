import BaseUseCase from "@/core/base/base-usecase";
import FeatureInterface from "../../interfaces/feature-interface";
import BaseFeaturesRepository from "../../repositories/base-features-repository";

class GetFeatureUseCase
  implements BaseUseCase<FeatureInterface, string>
{
  constructor(private baseFeaturesRepository: BaseFeaturesRepository) {}

  async call(id : string): Promise<FeatureInterface> {
    return await this.baseFeaturesRepository.getFeatureById(id);
  }
}

export default GetFeatureUseCase;
