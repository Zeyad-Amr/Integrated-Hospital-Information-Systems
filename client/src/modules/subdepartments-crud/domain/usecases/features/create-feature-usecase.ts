import BaseUseCase from "@/core/base/base-usecase";
import FeatureInterface from "../../interfaces/feature-interface";
import BaseFeaturesRepository from "../../repositories/base-features-repository";

class CreateFeatureUseCase
    implements BaseUseCase<boolean, FeatureInterface> {
    constructor(private baseFeaturesRepository: BaseFeaturesRepository) { }

    async call(data: FeatureInterface): Promise<boolean> {
        return await this.baseFeaturesRepository.createFeature(data);
    }
}

export default CreateFeatureUseCase;


