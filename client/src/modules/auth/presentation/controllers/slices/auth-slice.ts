import { createSlice } from "@reduxjs/toolkit";
import { login, getMe } from "../thunks/auth-thunks";
import { AuthState } from "../types";
import UserEntity from "@/modules/auth/domain/entities/user-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";

//* Initial State
const initialState: AuthState = {
    me: UserEntity.defaultValue(),
    authData: AuthDataEntity.defaultValue(),
    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        },
        clearAuthError(state) {
            state.error = "";
        },
        clearMe(state) {
            state.me = UserEntity.defaultValue();
        },
        clearAuthData(state) {
            state.authData = AuthDataEntity.defaultValue();
        },
        setAuthData(state, action: { payload: AuthDataEntity, type: string }) {
            state.authData = action.payload;
        },
        setMe(state, action: { payload: UserEntity, type: string }) {
            state.me = action.payload;
        }
    },
    extraReducers(builder) {
        //* login 
        builder.addCase(login.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(login.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* get me 
        builder.addCase(getMe.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loading = false;
            state.me = action.payload;
            state.error = "";
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });


    },
});

export const {
    clearAuthError,
    setLoading,
    clearAuthData,
    clearMe,
    setAuthData,
    setMe
} = authSlice.actions;
export default authSlice.reducer;