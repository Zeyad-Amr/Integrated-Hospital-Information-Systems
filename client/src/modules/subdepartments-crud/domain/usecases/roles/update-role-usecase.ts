import BaseUseCase from "@/core/base/base-usecase";
import RoleInterface from "../../interfaces/role-interface";
import BaseRolesRepository from "../../repositories/base-roles-repository";

class UpdateRoleUseCase
    implements BaseUseCase<boolean, RoleInterface> {
    constructor(private baseRolesRepository: BaseRolesRepository) { }

    async call(data: RoleInterface): Promise<boolean> {
        return await this.baseRolesRepository.updateRole(data);
    }
}

export default UpdateRoleUseCase;
