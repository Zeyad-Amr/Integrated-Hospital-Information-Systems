import StaffModel from '../models/staff-model';
import { ApiClient, Endpoints } from "@/core/api";

abstract class BaseStaffDataSource {
    abstract getStaffMemberById(id: string): Promise<StaffModel>;
    abstract getAllStaffMembers(): Promise<StaffModel[]>;
    abstract createStaffMember(staff: StaffModel): Promise<StaffModel>;
    abstract updateStaffMember(staff: StaffModel): Promise<StaffModel | null>;
    abstract deleteStaffMember(id: string): Promise<boolean>;
}

class StaffDataSource extends BaseStaffDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async getStaffMemberById(id: string): Promise<StaffModel> {
        const response = await this.apiClient.get(Endpoints.staff.details, {
            pathVariables: { id: id },
        });
        return StaffModel.fromJson(response.data);
    }

    override async getAllStaffMembers(): Promise<StaffModel[]> {

        const response = await this.apiClient.get(Endpoints.staff.list);
        return response.data.map((item: any) => StaffModel.fromJson(item));

    }

    override async createStaffMember(staff: StaffModel): Promise<StaffModel> {
        const response = await this.apiClient.post(Endpoints.staff.create, staff.toJson());
        return StaffModel.fromJson(response.data);
    }

    override async updateStaffMember(staff: StaffModel): Promise<StaffModel | null> {
        const response = await this.apiClient.patch(Endpoints.staff.update, staff.toJson(), {
            pathVariables: { id: staff.id },
        });
        return StaffModel.fromJson(response.data);
    }

    override async deleteStaffMember(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.staff.delete, {
            pathVariables: { id: id },
        });
        return true;
    }
}

export { BaseStaffDataSource, StaffDataSource };