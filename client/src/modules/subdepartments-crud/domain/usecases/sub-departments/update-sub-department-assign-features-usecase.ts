import BaseUseCase from "@/core/base/base-usecase";
import { SubDepartmentsAssignFeaturesInterface } from "../../interfaces/sub-departments-interface";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";

class UpdateSubDepartmentAssignFeaturesUseCase
    implements BaseUseCase<boolean, SubDepartmentsAssignFeaturesInterface> {
    constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

    async call(data: SubDepartmentsAssignFeaturesInterface): Promise<boolean> {
        return await this.baseSubDepartmentsRepository.updateSubDepartmentAssignFeature(data);
    }
}

export default UpdateSubDepartmentAssignFeaturesUseCase;
