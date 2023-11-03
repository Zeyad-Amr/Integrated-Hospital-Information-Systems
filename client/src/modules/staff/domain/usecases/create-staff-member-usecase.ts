import BaseUseCase from "@/core/base/base-usecase";
import StaffEntity from "../entities/staff-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseStaffRepository from "../repositories/base-staff-repository";
import { CreateStaffMemberUseCaseParameters } from "./usecase-params";

class CreateStaffMemberUseCase
    implements BaseUseCase<StaffEntity, CreateStaffMemberUseCaseParameters> {
    constructor(private baseStaffRepository: BaseStaffRepository) { }

    async call(param: CreateStaffMemberUseCaseParameters): Promise<Either<ErrorMessage, StaffEntity>> {
        return await this.baseStaffRepository.createStaffMember(param.staff);
    }
}

export default CreateStaffMemberUseCase;


