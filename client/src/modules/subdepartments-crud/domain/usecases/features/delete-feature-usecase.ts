import BaseUseCase from "@/core/base/base-usecase";
import BaseFeaturesRepository from "../../repositories/base-features-repository";

class DeleteFeatureUseCase
    implements BaseUseCase<boolean, string> {
    constructor(private baseFeaturesRepository: BaseFeaturesRepository) { }

    async call(id: string): Promise<boolean> {
        return await this.baseFeaturesRepository.deleteFeatureById(id);
    }
}

export default DeleteFeatureUseCase;
