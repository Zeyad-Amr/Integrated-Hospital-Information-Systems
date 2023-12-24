import { IDepartment, IRole, IShift } from "../data-values/interfaces";
import AuthInterface from "./auth-interface";
import PersonInterface from "./person-interface";

export default interface UserInterface {
    id: string;
    role?: IRole;
    shift?: IShift;
    department?: IDepartment;
    person?: PersonInterface;
    auth?: AuthInterface;
    createdAt?: Date;
    updatedAt?: Date;
}