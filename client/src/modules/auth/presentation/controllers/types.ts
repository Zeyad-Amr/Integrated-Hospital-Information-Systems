import AuthDataEntity from "../../domain/entities/auth-data-entity";
import UserEntity from "../../domain/entities/user-entity";

// Define the initial state using that type
export interface AuthState {
    me: UserEntity;
    authData: AuthDataEntity;
    loading: boolean;
    error: string;
}