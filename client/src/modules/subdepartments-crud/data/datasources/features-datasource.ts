import { ApiClient, Endpoints } from "@/core/api";
import FeatureInterface from "../../domain/interfaces/feature-interface";
import FeaturesModel from "../models/features-model";

abstract class BaseFeaturesDataSource {
    abstract createFeature(feature: FeatureInterface): Promise<boolean>;
    abstract updateFeature(feature: FeatureInterface): Promise<boolean>;
    abstract getAllFeatures(): Promise<FeatureInterface[]>;
    abstract getFeatureById(featureId: string): Promise<FeatureInterface>;
    abstract deleteFeatureById(featureId: string): Promise<boolean>;
}

class FeaturesDataSource extends BaseFeaturesDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createFeature(feature : FeatureInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.feature.create, FeaturesModel.toJson(feature));
        return response.data;
    }

    override async updateFeature(feature : FeatureInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.feature.update, FeaturesModel.toJson(feature) , {
            pathVariables: { id: feature.id },
        } );
        return true;
    }

    override async getAllFeatures(): Promise<FeatureInterface[]> {
        const response = await this.apiClient.get(Endpoints.feature.list);
        console.log(response.data,'getAllFeatures');
        return response.data.map((feature: any) => FeaturesModel.fromJson(feature));
    }

    override async getFeatureById(id: string): Promise<FeatureInterface> {
        const response = await this.apiClient.get(Endpoints.feature.details, {
            pathVariables: { id: id },
        });
        return FeaturesModel.fromJson(response.data);
    }

    override async deleteFeatureById(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.feature.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { FeaturesDataSource, BaseFeaturesDataSource };