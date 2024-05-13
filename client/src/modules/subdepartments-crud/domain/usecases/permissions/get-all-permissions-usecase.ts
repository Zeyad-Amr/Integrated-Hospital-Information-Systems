import BaseUseCase from "@/core/base/base-usecase";
import PermissionInterface from "../../interfaces/permission-interface";
import BasePermissionsRepository from "../../repositories/base-permissions-repository";

class GetAllPermissionsUseCase
    implements BaseUseCase<PermissionInterface[], void> {
    constructor(private basePermissionsRepository: BasePermissionsRepository) { }

    async call(): Promise<PermissionInterface[]> {
        return await this.basePermissionsRepository.getAllPermissions();
    }
}

export default GetAllPermissionsUseCase;
