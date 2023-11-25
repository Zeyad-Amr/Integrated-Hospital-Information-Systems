import EmployeeEntity from '../entities/employee-entity';
import { ErrorResponse } from "@/core/api";
import { Either } from "@/core/shared/utils/either";
import AuthDataEntity from '@/modules/auth/domain/entities/auth-data-entity';
abstract class BaseEmployeeRepository {
    abstract getEmployeeById(id: string): Promise<Either<ErrorResponse, EmployeeEntity>>;
    abstract getAllEmployees(): Promise<Either<ErrorResponse, EmployeeEntity[]>>;
    abstract createEmployee(employee: EmployeeEntity, authData: AuthDataEntity): Promise<Either<ErrorResponse, EmployeeEntity>>;
    abstract updateEmployee(employee: EmployeeEntity, authData: AuthDataEntity): Promise<Either<ErrorResponse, EmployeeEntity | null>>;
    abstract deleteEmployee(id: string): Promise<Either<ErrorResponse, boolean>>;
}

export default BaseEmployeeRepository;