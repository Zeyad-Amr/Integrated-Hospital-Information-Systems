import BaseUseCase from "@/core/base/base-usecase";
import RoleInterface from "../../interfaces/role-interface";
import BaseRolesRepository from "../../repositories/base-roles-repository";

class CreateRoleUseCase
    implements BaseUseCase<boolean, RoleInterface> {
    constructor(private baseRolesRepository: BaseRolesRepository) { }

    async call(data: RoleInterface): Promise<boolean> {
        return await this.baseRolesRepository.createRole(data);
    }
}

export default CreateRoleUseCase;


