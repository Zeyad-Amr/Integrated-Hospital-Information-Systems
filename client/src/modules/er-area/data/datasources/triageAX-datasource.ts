import { ApiClient, Endpoints } from "@/core/api";
import TriageAXInterface from "../../domain/interfaces/triageAX-interface";
import TriageAXModel from "../models/triageAX-model";

abstract class BaseTriageAXDataSource {
    abstract createTriageAX(employee: TriageAXInterface): Promise<void>;
}

class TriageAXDataSource extends BaseTriageAXDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    async createTriageAX(data: TriageAXInterface): Promise<void> {
        console.log('DS', TriageAXModel.toJson(data));
        await this.apiClient.patch(Endpoints.visit.triageAX, TriageAXModel.toJson(data));
    }

}

export { BaseTriageAXDataSource, TriageAXDataSource };