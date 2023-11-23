import LoginUserEntity from "../../domain/entities/login-user-entity";
import UserEntity from "../../domain/entities/user-entity";

// Define the initial state using that type
export interface AuthState {
    me: UserEntity;
    loginUser: LoginUserEntity;
    loading: boolean;
    error: string;
}