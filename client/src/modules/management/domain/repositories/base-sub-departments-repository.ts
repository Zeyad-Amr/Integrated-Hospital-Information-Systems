import { FilterQuery, PaginatedList } from "@/core/api";
import { SubDepartmentsInterface, SubDepartmentsAssignFeaturesInterface } from "../interfaces/sub-departments-interface";

abstract class BaseSubDepartmentsRepository {
    abstract createSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartment(subDepartment: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartmentAssignFeature(assignFeatures: SubDepartmentsAssignFeaturesInterface): Promise<boolean>;
    abstract getAllSubDepartments(filters: FilterQuery[]): Promise<PaginatedList<SubDepartmentsInterface>>;
    abstract getSubDepartmentById(subDepartmentId: string): Promise<SubDepartmentsInterface>;
    abstract deleteSubDepartmentById(subDepartmentId: string): Promise<boolean>;
}

export default BaseSubDepartmentsRepository;