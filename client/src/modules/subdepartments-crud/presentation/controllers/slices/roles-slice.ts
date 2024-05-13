import { createSlice } from "@reduxjs/toolkit";
import { createRole , deleteRole , getRoleDetails , getRolesList , updateRole } from "../thunks/roles-thunks";
import { RolesState } from "../types";
import { ErrorResponse } from "@/core/api";
import RoleEntity from "@/modules/subdepartments-crud/domain/entities/role-entity";
import RoleInterface from "@/modules/subdepartments-crud/domain/interfaces/role-interface";

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
        });
        builder.addCase(createRole.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
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
        });
        builder.addCase(updateRole.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* delete role 
        builder.addCase(deleteRole.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteRole.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.rolesList = state.rolesList.filter((role : RoleInterface) => role.id !== _action.payload);

        });
        builder.addCase(deleteRole.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
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