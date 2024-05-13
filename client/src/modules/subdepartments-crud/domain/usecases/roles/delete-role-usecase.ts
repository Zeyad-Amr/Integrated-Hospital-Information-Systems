import BaseUseCase from "@/core/base/base-usecase";
import BaseRolesRepository from "../../repositories/base-roles-repository";

class DeleteRoleUseCase
    implements BaseUseCase<boolean, string> {
    constructor(private baseRolesRepository: BaseRolesRepository) { }

    async call(id: string): Promise<boolean> {
        return await this.baseRolesRepository.deleteRoleById(id);
    }
}

export default DeleteRoleUseCase;
