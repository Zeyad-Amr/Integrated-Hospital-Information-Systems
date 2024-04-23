import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BaseSpecializationDataSource } from "../datasources/specialization-datasource";
import SpecializationInterface from "../../domain/interfaces/specialization -interface";

class SpecializationRepository extends BaseSpecializationDataSource {
    constructor(private baseSpecializationDataSource: BaseSpecializationDataSource) {
        super();
    }

    override async createSpecialization(specialization: SpecializationInterface): Promise<boolean> {
        try {
            await this.baseSpecializationDataSource.createSpecialization(specialization);
            return true;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateSpecialization(specialization: SpecializationInterface): Promise<boolean> {
        try {
            await this.baseSpecializationDataSource.updateSpecialization(specialization);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllSpecializations(): Promise<SpecializationInterface[]> {
        try {
            const result = await this.baseSpecializationDataSource.getAllSpecializations();
            console.log(result,"getAllSpecializations");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getSpecializationById(id: string): Promise<SpecializationInterface> {
        try {
            const result = await this.baseSpecializationDataSource.getSpecializationById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async deleteSpecializationById(id: string): Promise<boolean> {
        try {
            const result = await this.baseSpecializationDataSource.deleteSpecializationById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default SpecializationRepository;