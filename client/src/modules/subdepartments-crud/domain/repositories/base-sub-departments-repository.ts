import SubDepartmentsInterface from "../interfaces/sub-departments-interface";

abstract class BaseSubDepartmentsRepository {
    abstract createSubDepartment(specialization: SubDepartmentsInterface): Promise<boolean>;
    abstract updateSubDepartment(specialization: SubDepartmentsInterface): Promise<boolean>;
    abstract getAllSubDepartments(): Promise<SubDepartmentsInterface[]>;
    abstract getSubDepartmentById(specializationId: string): Promise<SubDepartmentsInterface>;
    abstract deleteSubDepartmentById(specializationId: string): Promise<boolean>;
}

export default BaseSubDepartmentsRepository;