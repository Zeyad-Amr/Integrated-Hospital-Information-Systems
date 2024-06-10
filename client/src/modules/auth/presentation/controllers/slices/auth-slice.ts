import { createSlice } from "@reduxjs/toolkit";
import { login, getMe } from "../thunks/auth-thunks";
import { AuthState } from "../types";
import UserEntity from "@/modules/auth/domain/entities/user-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
import { ErrorResponse } from "@/core/api";
import UserInterface from "@/modules/auth/domain/interfaces/user-interface";
import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import AlertService from "@/core/shared/utils/alert-service";
import AccountSubDepartmentPermissionEntity from "@/modules/auth/domain/entities/account-entity";
import { AccountSubDepartmentPermissionInterface } from "@/modules/auth/domain/interfaces/account-interface";

//* Initial State
const initialState: AuthState = {
    me: UserEntity.defaultValue(),
    permssions: [],
    currentPermission: AccountSubDepartmentPermissionEntity.defaultValue(),
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
        setAuthData(state, action: { payload: AuthInterface, type: string }) {
            state.authData = action.payload;
        },
        setMe(state, action: { payload: UserInterface, type: string }) {
            state.me = action.payload;
        },
        setCurrentAccountSubDepartmentPermissions(state, action: { payload: string, type: string }) {
            console.log(action.payload);
            const permission: AccountSubDepartmentPermissionInterface =
                state.permssions.find(
                    (permission: AccountSubDepartmentPermissionInterface) =>
                        permission.subDepartment.id == action.payload
                ) ?? AccountSubDepartmentPermissionEntity.defaultValue();
            console.log(permission);
            state.currentPermission = permission;
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
            AlertService.showAlert('تم تسجيل الدخول بنجاح', 'success');
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get me 
        builder.addCase(getMe.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.loading = false;
            state.me = action.payload.user;
            state.permssions = action.payload.permissions;
            state.currentPermission = action.payload.permissions.length > 0 ? action.payload.permissions[0] : AccountSubDepartmentPermissionEntity.defaultValue();
            state.error = "";
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            // AlertService.showAlert(`${state.error}`, 'error');
        });


    },
});

export const {
    clearAuthError,
    setLoading,
    clearAuthData,
    clearMe,
    setAuthData,
    setMe,
    setCurrentAccountSubDepartmentPermissions
} = authSlice.actions;
export default authSlice.reducer;