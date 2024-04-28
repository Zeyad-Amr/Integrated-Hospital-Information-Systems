import BaseUseCase from "@/core/base/base-usecase";
import PermissionInterface from "../../interfaces/permission-interface";
import BasePermissionsRepository from "../../repositories/base-permissions-repository";

class GetPermissionUseCase
  implements BaseUseCase<PermissionInterface, string>
{
  constructor(private basePermissionsRepository: BasePermissionsRepository) {}

  async call(id : string): Promise<PermissionInterface> {
    return await this.basePermissionsRepository.getPermissionById(id);
  }
}

export default GetPermissionUseCase;
