import { createSlice } from "@reduxjs/toolkit";
import { createPermission, deletePermission, getPermissionDetails, getPermissionsList, updatePermission } from "../thunks/permissions-thunks";
import { PermissionsState } from "../types";
import { ErrorResponse } from "@/core/api";
import PermissionEntity from "@/modules/management/domain/entities/permission-entity";
import PermissionInterface from "@/modules/management/domain/interfaces/permission-interface";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: PermissionsState = {
    permissionsList: [],
    currentPermission: PermissionEntity.defaultValue(),
    loading: false,
    error: "",
};

const permissionsSlice = createSlice({
    name: "permissions",
    initialState,
    reducers: {
        clearPermissionsError(state) {
            state.error = "";
        },
        clearCurrentPermission(state) {
            state.currentPermission = initialState.currentPermission;
        },
        clearPermissionsList(state) {
            state.permissionsList = [];
        },
        setCurrentPermission(state, action: { payload: PermissionInterface, type: string }) {
            state.currentPermission = action.payload;
        },
        setPermissionsList(state, action: { payload: PermissionInterface[], type: string }) {
            state.permissionsList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all Permissions from api
        builder.addCase(getPermissionsList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getPermissionsList.fulfilled, (state, action) => {
            state.loading = false;
            state.permissionsList = action.payload;
            state.error = "";
            console.log('getPermissionsList', action.payload);
        });
        builder.addCase(getPermissionsList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.permissionsList = [];
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* create Permission 
        builder.addCase(createPermission.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createPermission.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentPermission = initialState.currentPermission;
            state.error = "";
            AlertService.showAlert('تم اضافة صلاحية بنجاح', 'success')
        });
        builder.addCase(createPermission.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update Permission 
        builder.addCase(updatePermission.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updatePermission.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentPermission = initialState.currentPermission;
            state.error = "";
            AlertService.showAlert('تم تحديث صلاحية بنجاح', 'success')
        });
        builder.addCase(updatePermission.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete Permission 
        builder.addCase(deletePermission.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deletePermission.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.permissionsList = state.permissionsList.filter((permission: PermissionInterface) => permission.id !== _action.payload);
            AlertService.showAlert('تم حذف صلاحية بنجاح', 'success')
        });
        builder.addCase(deletePermission.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get single Permission details
        builder.addCase(getPermissionDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getPermissionDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentPermission = action.payload;
            state.error = "";
        });
        builder.addCase(getPermissionDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentPermission = initialState.currentPermission;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    },
});

export const {
    setLoading,
    setPermissionsList,
    setCurrentPermission,
    clearPermissionsList,
    clearCurrentPermission,
    clearPermissionsError,
} = permissionsSlice.actions;
export default permissionsSlice.reducer;