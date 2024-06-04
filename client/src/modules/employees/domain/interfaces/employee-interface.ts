import UserInterface from "@/modules/auth/domain/interfaces/user-interface";
import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";

export default interface EmployeeInterface extends UserInterface {

}

export interface ExtendedSubDepartmentsInterface extends SubDepartmentInterface {
  employeeId: string | number;
}
