import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";

// Define the initial state using that type
export interface EmployeeState {
    employeeList: EmployeeEntity[];
    currentEmployee: EmployeeEntity | null;
    loading: boolean;
    error: string;
}