import { SubDepartmentInterface } from "@/modules/management/domain/interfaces/sub-departments-interface";
import UserInterface from "./user-interface";
import { FeatureInterface } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";


export interface AccountSubDepartmentPermissionInterface {
    subDepartment: SubDepartmentInterface;
    permissions: FeatureInterface[];
}

export interface AccountInterface {
    user: UserInterface;
    permissions: AccountSubDepartmentPermissionInterface[];
}

