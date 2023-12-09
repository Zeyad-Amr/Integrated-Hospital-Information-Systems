import AuthInterface from "./auth-interface";
import PersonInterface from "./person-interface";

export default interface UserInterface {
    id: string;
    role: string;
    shift: string;
    department: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdById?: string;
    person: PersonInterface;
    auth: AuthInterface;
}