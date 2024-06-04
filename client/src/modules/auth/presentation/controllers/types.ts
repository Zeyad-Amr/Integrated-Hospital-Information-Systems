import { AccountSubDepartmentPermissionInterface } from "../../domain/interfaces/account-interface";
import AuthInterface from "../../domain/interfaces/auth-interface";
import UserInterface from "../../domain/interfaces/user-interface";

// Define the initial state using that type
export interface AuthState {
    me: UserInterface;
    permssions: AccountSubDepartmentPermissionInterface[];
    authData: AuthInterface;
    loading: boolean;
    error: string;
}