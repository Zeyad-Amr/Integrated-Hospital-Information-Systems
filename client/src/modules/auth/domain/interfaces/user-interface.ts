import { RoleType, ShiftType } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface";
import AuthInterface from "./auth-interface";
import PersonInterface from "../../../../core/shared/modules/person/domain/interfaces/person-interface";

export default interface UserInterface {
    id: string;
    role?: RoleType;
    shift?: ShiftType;
    suDepartmentIds?: number[] | string[];
    person?: PersonInterface;
    auth?: AuthInterface;
    createdAt?: Date;
    updatedAt?: Date;
}