import StaffModel from '../models/staff-model';
import { ApiClient, Endpoints, ErrorResponse, ErrorMessage } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
export abstract class BaseStaffDataSource {
    abstract getStaffMemberById(id: string): Promise<Either<ErrorResponse, StaffModel>>;
    abstract getAllStaffMembers(): Promise<Either<ErrorResponse, StaffModel[]>>;
    abstract createStaffMember(staff: StaffModel): Promise<Either<ErrorResponse, StaffModel>>;
    abstract updateStaffMember(id: string, staff: StaffModel): Promise<Either<ErrorResponse, StaffModel | null>>;
    abstract deleteStaffMember(id: string): Promise<Either<ErrorResponse, boolean>>;
}

class StaffDataSource extends BaseStaffDataSource {
    private static instance: StaffDataSource;

    private constructor() {
        super();
    }

    //* Singleton pattern implementation to get the same instance of the class every time
    public static getInstance(): StaffDataSource {
        if (!StaffDataSource.instance) {
            StaffDataSource.instance = new StaffDataSource();
        }

        return StaffDataSource.instance;
    }


    async getStaffMemberById(id: string): Promise<Either<ErrorResponse, StaffModel>> {
        try {
            const response = await ApiClient.get(Endpoints.staff.details, {
                pathVariables: { id: id },
            });
            return Either.right(StaffModel.fromJson(response.data));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    async getAllStaffMembers(): Promise<Either<ErrorResponse, StaffModel[]>> {
        try {
            const response = await ApiClient.get(Endpoints.staff.list);
            return Either.right(response.data.map((item: any) => StaffModel.fromJson(item)));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    async createStaffMember(staff: StaffModel): Promise<Either<ErrorResponse, StaffModel>> {
        try {
            const response = await ApiClient.post(Endpoints.staff.create, staff.toJson());
            return Either.right(StaffModel.fromJson(response.data));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    async updateStaffMember(id: string, staff: StaffModel): Promise<Either<ErrorResponse, StaffModel | null>> {
        try {
            const response = await ApiClient.patch(Endpoints.staff.update, staff.toJson(), {
                pathVariables: { id: id },
            });
            return Either.right(StaffModel.fromJson(response.data));
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    async deleteStaffMember(id: string): Promise<Either<ErrorResponse, boolean>> {
        try {
            const response = await ApiClient.delete(Endpoints.staff.delete, {
                pathVariables: { id: id },
            });
            return Either.right(true);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
}

export default StaffDataSource.getInstance();