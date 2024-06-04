import BaseUseCase from "@/core/base/base-usecase";
import { SubDepartmentAssignFeaturesInterface } from "../../interfaces/sub-departments-interface";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";

class UpdateSubDepartmentAssignFeaturesUseCase
    implements BaseUseCase<boolean, SubDepartmentAssignFeaturesInterface> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(data: SubDepartmentAssignFeaturesInterface): Promise<boolean> {
        return await this.baseSubDepartmentsRepository.updateSubDepartmentAssignFeature(data);
    }
}

export default UpdateSubDepartmentAssignFeaturesUseCase;
