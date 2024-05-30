import { createSlice } from "@reduxjs/toolkit";
import { getEmployeeList, createEmployee, updateEmployee, deleteEmployee, getEmployeeDetails } from "../thunks/employee-thunks";
import { EmployeeState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";
import PersonEntity from "@/core/shared/modules/person/domain/entities/person-entity";
import AlertService from "@/core/shared/utils/alert-service";
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";
import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";

//* Initial State
const initialState: EmployeeState = {
    employees: PaginatedListModel.default(),
    currentEmployee: EmployeeEntity.defaultValue(),
    currentAuth: AuthDataEntity.defaultValue(),
    currentPerson: PersonEntity.defaultValue(),
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
            state.currentEmployee = initialState.currentEmployee;
        },
        clearEmployeeList(state) {
            state.employees = initialState.employees;
        },
        setCurrentEmployee(state, action: { payload: EmployeeInterface, type: string }) {
            state.currentEmployee = action.payload;
        },
        setCurrentAuth(state, action: { payload: AuthInterface, type: string }) {
            state.currentAuth = action.payload;
        },
        setCurrentPerson(state, action: { payload: PersonInterface, type: string }) {
            state.currentPerson = action.payload;
        },
        setEmployeeList(state, action: { payload: EmployeeInterface[], type: string }) {
            state.employees.items = action.payload;
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
            state.error = "";
            state.employees = PaginatedListModel.updatePaginatedList(state.employees, action.payload);
            console.log('Employees List', action.payload);
        });
        builder.addCase(getEmployeeList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');

        });

        //* create employee member
        builder.addCase(createEmployee.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createEmployee.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert('تم اضافة موظف بنجاح', 'success');

        });
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update employee member
        builder.addCase(updateEmployee.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateEmployee.fulfilled, (state, _action) => {
            state.loading = false;
            AlertService.showAlert('تم تحديث موظف بنجاح', 'success');
            state.employees = { ...state.employees, isInitial: true }
            state.error = "";
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete employee member
        builder.addCase(deleteEmployee.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteEmployee.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert('تم حذف موظف بنجاح', 'success');
        });
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
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
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
            state.currentEmployee = initialState.currentEmployee;
        });

    },
});

export const {
    setLoading,
    setCurrentEmployee,
    clearEmployeeError,
    clearCurrentEmployee,
    clearEmployeeList,
    setEmployeeList,
    setCurrentAuth,
    setCurrentPerson,

} = employeeSlice.actions;
export default employeeSlice.reducer;