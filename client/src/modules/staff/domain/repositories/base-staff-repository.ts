import StaffEntity from '../entities/staff-entity';
import { ErrorResponse } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
abstract class BaseStaffRepository {
    abstract getStaffMemberById(id: string): Promise<Either<ErrorResponse, StaffEntity>>;
    abstract getAllStaffMembers(): Promise<Either<ErrorResponse, StaffEntity[]>>;
    abstract createStaffMember(staff: StaffEntity): Promise<Either<ErrorResponse, StaffEntity>>;
    abstract updateStaffMember(staff: StaffEntity): Promise<Either<ErrorResponse, StaffEntity | null>>;
    abstract deleteStaffMember(id: string): Promise<Either<ErrorResponse, boolean>>;
}

export default BaseStaffRepository;