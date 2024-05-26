import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BaseFeaturesDataSource } from "../datasources/features-datasource";
import FeatureInterface from "../../domain/interfaces/feature-interface";
import BaseFeaturesRepository from "../../domain/repositories/base-features-repository";

class FeaturesRepository extends BaseFeaturesRepository {
    constructor(private baseFeaturesDataSource: BaseFeaturesDataSource) {
        super();
    }

    override async createFeature(feature: FeatureInterface): Promise<boolean> {
        try {
            await this.baseFeaturesDataSource.createFeature(feature);
            return true;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateFeature(feature: FeatureInterface): Promise<boolean> {
        try {
            await this.baseFeaturesDataSource.updateFeature(feature);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllFeatures(): Promise<FeatureInterface[]> {
        try {
            const result = await this.baseFeaturesDataSource.getAllFeatures();
            console.log(result, "getAllFeatures");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getFeatureById(id: string): Promise<FeatureInterface> {
        try {
            const result = await this.baseFeaturesDataSource.getFeatureById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async deleteFeatureById(id: string): Promise<boolean> {
        try {
            const result = await this.baseFeaturesDataSource.deleteFeatureById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default FeaturesRepository;