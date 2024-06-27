import { ApiClient, Endpoints } from "@/core/api";
import { TriageAXInterface, TriageTransferInterface } from "../../domain/interfaces/triageAX-interface";
import TriageAXModel from "../models/triageAX-model";

abstract class BaseTriageAXDataSource {
    abstract createTriageAX(data: TriageAXInterface): Promise<void>;
    abstract createTriageTransfer(data: TriageTransferInterface, visitCode: string): Promise<void>;
}

class TriageAXDataSource extends BaseTriageAXDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    async createTriageAX(data: TriageAXInterface): Promise<void> {
        console.log('DS', TriageAXModel.toJson(data));
        await this.apiClient.patch(Endpoints.visit.triageAX, TriageAXModel.toJson(data));
    }

    async createTriageTransfer(data: TriageTransferInterface, visitCode: string): Promise<void> {
        // console.log('DS', TriageAXModel.toJson(data));
        await this.apiClient.patch(Endpoints.visit.triageAX, TriageAXModel.triageTransferToJson(data), { pathVariables: { visitCode } });
    }

}

export { BaseTriageAXDataSource, TriageAXDataSource };