import BaseUseCase from "@/core/base/base-usecase";
import StaffEntity from "../entities/staff-entity";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseStaffRepository from "../repositories/base-staff-repository";
import { GetStaffMemberByIdUseCaseParameters } from "./usecase-params";

class GetStaffMemberByIdUseCase
    implements BaseUseCase<StaffEntity, GetStaffMemberByIdUseCaseParameters> {
    constructor(private baseStaffRepository: BaseStaffRepository) { }

    async call(param: GetStaffMemberByIdUseCaseParameters): Promise<Either<ErrorMessage, StaffEntity>> {
        return await this.baseStaffRepository.getStaffMemberById(param.id);

    }
}

export default GetStaffMemberByIdUseCase;


