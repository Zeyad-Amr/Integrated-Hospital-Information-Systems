import DepartmentsInterface from "../interfaces/departments-interface";

abstract class BaseDepartmentsRepository {
    abstract getAllDepartments(): Promise<DepartmentsInterface[]>;
}

export default BaseDepartmentsRepository;