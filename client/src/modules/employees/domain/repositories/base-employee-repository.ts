import { FilterQuery, PaginatedList } from '@/core/api';
import EmployeeInterface from '../interfaces/employee-interface';
abstract class BaseEmployeeRepository {
    abstract getEmployeeById(id: string): Promise<EmployeeInterface>;
    abstract getAllEmployees(filters: FilterQuery[]): Promise<PaginatedList<EmployeeInterface>>;
    abstract createEmployee(employee: EmployeeInterface): Promise<boolean>;
    abstract updateEmployee(employee: EmployeeInterface): Promise<boolean>;
    abstract deleteEmployee(id: string): Promise<boolean>;
}

export default BaseEmployeeRepository;