import BaseUseCase from "@/core/base/base-usecase";
import PermissionInterface from "../../interfaces/permission-interface";
import BasePermissionsRepository from "../../repositories/base-permissions-repository";

class CreatePermissionUseCase
    implements BaseUseCase<boolean, PermissionInterface> {
    constructor(private basePermissionsRepository: BasePermissionsRepository) { }

    async call(data: PermissionInterface): Promise<boolean> {
        return await this.basePermissionsRepository.createPermission(data);
    }
}

export default CreatePermissionUseCase;


