import { FilterQuery, PaginatedList } from "@/core/api";
import { SubDepartmentInterface, SubDepartmentAssignFeaturesInterface } from "../interfaces/sub-departments-interface";

abstract class BaseSubDepartmentsRepository {
    abstract createSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean>;
    abstract updateSubDepartment(subDepartment: SubDepartmentInterface): Promise<boolean>;
    abstract updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentAssignFeaturesInterface): Promise<boolean>;
    abstract getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentInterface>>;
    abstract getSubDepartmentById(subDepartmentId: string): Promise<SubDepartmentInterface>;
    abstract deleteSubDepartmentById(subDepartmentId: string): Promise<boolean>;
}

export default BaseSubDepartmentsRepository;