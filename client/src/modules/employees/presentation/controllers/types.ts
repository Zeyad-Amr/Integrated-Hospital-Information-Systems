import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import PersonInterface from "@/modules/auth/domain/interfaces/person-interface";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";

// Define the initial state using that type
export interface EmployeeState {
    employeeList: EmployeeInterface[];
    currentEmployee: EmployeeInterface;
    currentAuth: AuthInterface;
    currentPerson: PersonInterface;
    loading: boolean;
    error: string;
}