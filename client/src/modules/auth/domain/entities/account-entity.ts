import SubDepartmentsEntity from "@/modules/management/domain/entities/sub-departments-entity";
import { AccountInterface, AccountSubDepartmentPermissionInterface } from "../interfaces/account-interface";
import UserEntity from "./user-entity";
export class AccountEntity {
  //* --------------------- Methods ---------------------
  static defaultValue(): AccountInterface {
    return {
      permissions: [],
      user: UserEntity.defaultValue(),
    };
  }

  static hasPermission(subdepartmentPermissions: AccountSubDepartmentPermissionInterface, permission: string): boolean {
    return subdepartmentPermissions.permissions.some((p) => p.code === permission);
  }
}

export default class AccountSubDepartmentPermissionEntity {
  //* --------------------- Methods ---------------------
  static defaultValue(): AccountSubDepartmentPermissionInterface {
    return {
      subDepartment: SubDepartmentsEntity.defaultValue(),
      permissions: [],
    };
  }
}