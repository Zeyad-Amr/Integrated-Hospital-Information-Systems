import { createSlice } from "@reduxjs/toolkit";
import { getDepartmentsList } from "../thunks/departments-thunks";
import { DepartmentsState } from "../types";
import { ErrorResponse } from "@/core/api";
import DepartmentsInterface from "@/modules/subdepartments-crud/domain/interfaces/departments-interface";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: DepartmentsState = {
    departmentsList: [],
    loading: false,
    error: "",
};

const departmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        clearDepartmentsError(state) {
            state.error = "";
        },
        clearDepartmentsList(state) {
            state.departmentsList = [];
        },
        setDepartmentsList(state, action: { payload: DepartmentsInterface[], type: string }) {
            state.departmentsList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all departments from api
        builder.addCase(getDepartmentsList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getDepartmentsList.fulfilled, (state, action) => {
            state.loading = false;
            state.departmentsList = action.payload;
            state.error = "";
            console.log('departments List', action.payload);
        });
        builder.addCase(getDepartmentsList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.departmentsList = [];
            AlertService.showAlert( `${state.error}` , 'error');
        });
    },
});

export const {
    clearDepartmentsError,
    clearDepartmentsList,
    setDepartmentsList,
    setLoading,
} = departmentsSlice.actions;
export default departmentsSlice.reducer;