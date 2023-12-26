import { LookupsInterface } from '../../domain/interfaces/lookups-interface';
import LookupsModel from '../models/lookups-model';
import { ApiClient, Endpoints } from "@/core/api";

abstract class BaseLookupsDataSource {
    abstract getLookups(): Promise<LookupsInterface>;

}

class LookupsDataSource extends BaseLookupsDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async getLookups(): Promise<LookupsInterface> {
        console.log('DS Get');
        const response = await this.apiClient.get(Endpoints.lookups.list);
        const response2 = await this.apiClient.get(Endpoints.department.list);
        response.data.enums.departments = response2.data.map((department: any) => ({ id: department.id, value: department.name }));
        return LookupsModel.fromJson(response.data.enums);
    }

}

export { BaseLookupsDataSource, LookupsDataSource };