import FeatureInterface from "../interfaces/feature-interface";

abstract class BaseFeaturesRepository {
    abstract createFeature(feature: FeatureInterface): Promise<boolean>;
    abstract updateFeature(feature: FeatureInterface): Promise<boolean>;
    abstract getAllFeatures(): Promise<FeatureInterface[]>;
    abstract getFeatureById(featureId: string): Promise<FeatureInterface>;
    abstract deleteFeatureById(featureId: string): Promise<boolean>;
}

export default BaseFeaturesRepository;