import BaseUseCase from "@/core/base/base-usecase";
import StaffEntity from "../entities/staff-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseStaffRepository from "../repositories/base-staff-repository";
import { UpdateStaffMemberUseCaseParameters } from "./usecase-params";

class UpdateStaffMemberUseCase
    implements BaseUseCase<StaffEntity | null, UpdateStaffMemberUseCaseParameters> {
    constructor(private baseStaffRepository: BaseStaffRepository) { }

    async call(param: UpdateStaffMemberUseCaseParameters): Promise<Either<ErrorMessage, StaffEntity | null>> {
        return await this.baseStaffRepository.updateStaffMember(param.staff);
    }
}

export default UpdateStaffMemberUseCase;
