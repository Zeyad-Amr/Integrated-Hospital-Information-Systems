import BaseUseCase from "@/core/base/base-usecase";
import { Either } from "@/core/shared/utils/either";
import { ErrorMessage } from "@/core/api";
import BaseStaffRepository from "../repositories/base-staff-repository";
import { DeleteStaffMemberUseCaseParameters } from "./usecase-params";

class DeleteStaffMemberUseCase
    implements BaseUseCase<boolean, DeleteStaffMemberUseCaseParameters> {
    constructor(private baseStaffRepository: BaseStaffRepository) { }

    async call(param: DeleteStaffMemberUseCaseParameters): Promise<Either<ErrorMessage, boolean>> {
        return await this.baseStaffRepository.deleteStaffMember(param.id);
    }
}

export default DeleteStaffMemberUseCase;
