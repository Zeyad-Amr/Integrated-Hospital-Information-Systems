import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";

// Define the initial state using that type
export interface EmployeeState {
    employeeList: EmployeeInterface[];
    currentEmployee: EmployeeInterface | null;
    loading: boolean;
    error: string;
}