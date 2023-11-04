import BaseUseCase from "@/core/base/base-usecase";
import StaffEntity from "../entities/staff-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseStaffRepository from "../repositories/base-staff-repository";
import { GetStaffDetailsUseCaseParameters } from "./usecase-params";

class GetStaffDetailsUseCase
    implements BaseUseCase<StaffEntity, GetStaffDetailsUseCaseParameters> {
    constructor(private baseStaffRepository: BaseStaffRepository) { }

    async call(param: GetStaffDetailsUseCaseParameters): Promise<Either<ErrorMessage, StaffEntity>> {
        return await this.baseStaffRepository.getStaffMemberById(param.id);

    }
}

export default GetStaffDetailsUseCase;


