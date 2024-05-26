import BaseUseCase from "@/core/base/base-usecase";
import RoleInterface from "../../interfaces/role-interface";
import BaseRolesRepository from "../../repositories/base-roles-repository";

class GetAllRolesUseCase
    implements BaseUseCase<RoleInterface[], void> {
    constructor(private baseRolesRepository: BaseRolesRepository) { }

    async call(): Promise<RoleInterface[]> {
        return await this.baseRolesRepository.getAllRoles();
    }
}

export default GetAllRolesUseCase;
