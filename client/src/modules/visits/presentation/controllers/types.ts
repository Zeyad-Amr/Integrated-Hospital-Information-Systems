import AuthDataEntity from "../../domain/entities/visit-entity";
import UserEntity from "../../domain/entities/user-entity";

// Define the initial state using that type
export interface AuthState {
    me: UserEntity;
    authData: AuthDataEntity;
    loading: boolean;
    error: string;
}