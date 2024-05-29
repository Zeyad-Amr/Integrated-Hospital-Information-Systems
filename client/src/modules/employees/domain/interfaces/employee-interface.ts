import UserInterface from "@/modules/auth/domain/interfaces/user-interface";
import { SubDepartmentsInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";

export default interface EmployeeInterface extends UserInterface {

}

export interface ExtendedSubDepartmentsInterface extends SubDepartmentsInterface {
    employeeId: string | number;
  }
