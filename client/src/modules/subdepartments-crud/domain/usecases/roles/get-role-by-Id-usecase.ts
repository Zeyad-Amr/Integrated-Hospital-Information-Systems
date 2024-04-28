import BaseUseCase from "@/core/base/base-usecase";
import RoleInterface from "../../interfaces/role-interface";
import BaseRolesRepository from "../../repositories/base-roles-repository";

class GetRoleUseCase
  implements BaseUseCase<RoleInterface, string>
{
  constructor(private baseRolesRepository: BaseRolesRepository) {}

  async call(id : string): Promise<RoleInterface> {
    return await this.baseRolesRepository.getRoleById(id);
  }
}

export default GetRoleUseCase;
