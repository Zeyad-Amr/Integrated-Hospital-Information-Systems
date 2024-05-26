import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import { PaginatedList } from "@/core/api";

// Define the initial state using that type
export interface EmployeeState {
    employees: PaginatedList<EmployeeInterface>;
    currentEmployee: EmployeeInterface;
    currentAuth: AuthInterface;
    currentPerson: PersonInterface;
    loading: boolean;
    error: string;
}