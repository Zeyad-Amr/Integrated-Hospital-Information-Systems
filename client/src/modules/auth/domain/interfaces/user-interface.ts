import { Department, RoleType, ShiftType } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";
import AuthInterface from "./auth-interface";
import PersonInterface from "./person-interface";

export default interface UserInterface {
    id: string;
    role?: RoleType;
    shift?: ShiftType;
    department?: Department;
    person?: PersonInterface;
    auth?: AuthInterface;
    createdAt?: Date;
    updatedAt?: Date;
}