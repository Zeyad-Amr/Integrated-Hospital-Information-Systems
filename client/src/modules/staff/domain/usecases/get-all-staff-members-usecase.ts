import BaseUseCase from "@/core/base/base-usecase";
import StaffEntity from "../entities/staff-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseStaffRepository from "../repositories/base-staff-repository";

class GetAllStaffMembersUseCase
    implements BaseUseCase<StaffEntity[], void> {
    constructor(private baseStaffRepository: BaseStaffRepository) { }

    async call(): Promise<Either<ErrorMessage, StaffEntity[]>> {
        return await this.baseStaffRepository.getAllStaffMembers();
    }
}

export default GetAllStaffMembersUseCase;
