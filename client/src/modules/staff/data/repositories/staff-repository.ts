import { ErrorResponse, ErrorMessage } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import BaseStaffRepository from '../../domain/repositories/base-staff-repository';
import { BaseStaffDataSource } from '../datasources/staff-datasource';
import StaffEntity from '../../domain/entities/staff-entity';
import StaffMapper from "../mappers/staff-mapper";


class StaffRepository extends BaseStaffRepository {
    constructor(private baseStaffDataSource: BaseStaffDataSource) {
        super();
    }

    override async getStaffMemberById(id: string): Promise<Either<ErrorResponse, StaffEntity>> {
        try {
            const result = await this.baseStaffDataSource.getStaffMemberById(id);
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

    override async getAllStaffMembers(): Promise<Either<ErrorResponse, StaffEntity[]>> {
        try {
            const result = await this.baseStaffDataSource.getAllStaffMembers();
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
    override async createStaffMember(staff: StaffEntity): Promise<Either<ErrorResponse, StaffEntity>> {
        try {
            const result = await this.baseStaffDataSource.createStaffMember(StaffMapper.entityToModel(staff));
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
    override async updateStaffMember(staff: StaffEntity): Promise<Either<ErrorResponse, StaffEntity | null>> {
        try {
            const result = await this.baseStaffDataSource.updateStaffMember(StaffMapper.entityToModel(staff));
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }
    override async deleteStaffMember(id: string): Promise<Either<ErrorResponse, boolean>> {
        try {
            const result = await this.baseStaffDataSource.deleteStaffMember(id);
            return Either.right(result);
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            return Either.left(errorResponse);
        }
    }

}

export default StaffRepository;