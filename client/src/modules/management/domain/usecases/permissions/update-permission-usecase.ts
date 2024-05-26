import BaseUseCase from "@/core/base/base-usecase";
import PermissionInterface from "../../interfaces/permission-interface";
import BasePermissionsRepository from "../../repositories/base-permissions-repository";

class UpdatePermissionUseCase
    implements BaseUseCase<boolean, PermissionInterface> {
    constructor(private basePermissionsRepository: BasePermissionsRepository) { }

    async call(data: PermissionInterface): Promise<boolean> {
        return await this.basePermissionsRepository.updatePermission(data);
    }
}

export default UpdatePermissionUseCase;
