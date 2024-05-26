import BaseUseCase from "@/core/base/base-usecase";
import BasePermissionsRepository from "../../repositories/base-permissions-repository";

class DeletePermissionUseCase
    implements BaseUseCase<boolean, string> {
    constructor(private basePermissionsRepository: BasePermissionsRepository) { }

    async call(id: string): Promise<boolean> {
        return await this.basePermissionsRepository.deletePermissionById(id);
    }
}

export default DeletePermissionUseCase;
