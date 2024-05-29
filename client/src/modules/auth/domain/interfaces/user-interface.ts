import AuthInterface from "./auth-interface";
import PersonInterface from "../../../../core/shared/modules/person/domain/interfaces/person-interface";

export default interface UserInterface {
    id: string;
    roleId?: number | string;
    shiftId?: number | string;
    suDepartmentIds?: number[] | string[];
    person?: PersonInterface;
    auth?: AuthInterface;
    createdAt?: Date;
    updatedAt?: Date;
}