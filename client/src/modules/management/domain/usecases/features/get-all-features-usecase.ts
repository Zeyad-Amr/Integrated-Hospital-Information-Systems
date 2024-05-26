import BaseUseCase from "@/core/base/base-usecase";
import FeatureInterface from "../../interfaces/feature-interface";
import BaseFeaturesRepository from "../../repositories/base-features-repository";

class GetAllFeaturesUseCase
    implements BaseUseCase<FeatureInterface[], void> {
    constructor(private baseFeaturesRepository: BaseFeaturesRepository) { }

    async call(): Promise<FeatureInterface[]> {
        return await this.baseFeaturesRepository.getAllFeatures();
    }
}

export default GetAllFeaturesUseCase;
