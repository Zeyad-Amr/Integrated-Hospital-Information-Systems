import { createSlice } from "@reduxjs/toolkit";
import { getEmployeeList, createEmployee, updateEmployee, deleteEmployee, getEmployeeDetails } from "../thunks/employee-thunks";
import { EmployeeState } from "../types";
import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";

//* Initial State
const initialState: EmployeeState = {
    employeeList: [],
    currentEmployee: null,
    loading: false,
    error: "",
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        clearEmployeeError(state) {
            state.error = "";
        },
        clearCurrentEmployee(state) {
            state.currentEmployee = null;
        },
        clearEmployeeList(state) {
            state.employeeList = [];
        },
        setCurrentEmployee(state, action: { payload: EmployeeEntity, type: string }) {
            state.currentEmployee = action.payload;
        },
        setEmployeeList(state, action: { payload: EmployeeEntity[], type: string }) {
            state.employeeList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get employee from api
        builder.addCase(getEmployeeList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getEmployeeList.fulfilled, (state, action) => {
            state.loading = false;
            state.employeeList = action.payload;
            state.error = "";
        });
        builder.addCase(getEmployeeList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.employeeList = [];
        });

        //* create employee member
        builder.addCase(createEmployee.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.currentEmployee = action.payload;
            state.error = "";
        });
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* update employee member
        builder.addCase(updateEmployee.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.currentEmployee = action.payload;
            state.error = "";
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* delete employee member
        builder.addCase(deleteEmployee.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteEmployee.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.employeeList = state.employeeList.filter((employee) => employee.id !== _action.payload);

        });
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* get employee details
        builder.addCase(getEmployeeDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getEmployeeDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentEmployee = action.payload;
            state.error = "";
        });
        builder.addCase(getEmployeeDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.currentEmployee = null;
        });

    },
});

export const {
    clearEmployeeError,
    clearCurrentEmployee,
    clearEmployeeList,
    setCurrentEmployee,
    setEmployeeList,
    setLoading
} = employeeSlice.actions;
export default employeeSlice.reducer;