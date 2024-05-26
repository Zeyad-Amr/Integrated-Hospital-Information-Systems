import { createSlice } from "@reduxjs/toolkit";
import { createRole, deleteRole, getRoleDetails, getRolesList, updateRole } from "../thunks/roles-thunks";
import { RolesState } from "../types";
import { ErrorResponse } from "@/core/api";
import RoleEntity from "@/modules/management/domain/entities/role-entity";
import RoleInterface from "@/modules/management/domain/interfaces/role-interface";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: RolesState = {
    rolesList: [],
    currentRole: RoleEntity.defaultValue(),
    loading: false,
    error: "",
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        clearRolesError(state) {
            state.error = "";
        },
        clearCurrentRole(state) {
            state.currentRole = initialState.currentRole;
        },
        clearRolesList(state) {
            state.rolesList = [];
        },
        setCurrentRole(state, action: { payload: RoleInterface, type: string }) {
            state.currentRole = action.payload;
        },
        setRolesList(state, action: { payload: RoleInterface[], type: string }) {
            state.rolesList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all roles from api
        builder.addCase(getRolesList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRolesList.fulfilled, (state, action) => {
            state.loading = false;
            state.rolesList = action.payload;
            state.error = "";
            console.log('getRolesList', action.payload);
        });
        builder.addCase(getRolesList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.rolesList = [];
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* create role 
        builder.addCase(createRole.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createRole.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentRole = initialState.currentRole;
            state.error = "";
            AlertService.showAlert('تم اضافة وظيفة بنجاح', 'success')
        });
        builder.addCase(createRole.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update role 
        builder.addCase(updateRole.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateRole.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentRole = initialState.currentRole;
            state.error = "";
            AlertService.showAlert('تم تحديث وظيفة بنجاح', 'success')
        });
        builder.addCase(updateRole.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete role 
        builder.addCase(deleteRole.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteRole.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.rolesList = state.rolesList.filter((role: RoleInterface) => role.id !== _action.payload);
            AlertService.showAlert('تم حذف وظيفة بنجاح', 'success')
        });
        builder.addCase(deleteRole.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get single role details
        builder.addCase(getRoleDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRoleDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentRole = action.payload;
            state.error = "";
        });
        builder.addCase(getRoleDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentRole = initialState.currentRole;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    },
});

export const {
    setLoading,
    setRolesList,
    setCurrentRole,
    clearRolesList,
    clearCurrentRole,
    clearRolesError,
} = rolesSlice.actions;
export default rolesSlice.reducer;