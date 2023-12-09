import EmployeeEntity from '../entities/employee-entity';
import AuthDataEntity from '@/modules/auth/domain/entities/auth-data-entity';
abstract class BaseEmployeeRepository {
    abstract getEmployeeById(id: string): Promise<EmployeeEntity>;
    abstract getAllEmployees(): Promise<EmployeeEntity[]>;
    abstract createEmployee(employee: EmployeeEntity, authData: AuthDataEntity): Promise<EmployeeEntity>;
    abstract updateEmployee(employee: EmployeeEntity, authData: AuthDataEntity): Promise<EmployeeEntity>;
    abstract deleteEmployee(id: string): Promise<boolean>;
}

export default BaseEmployeeRepository;