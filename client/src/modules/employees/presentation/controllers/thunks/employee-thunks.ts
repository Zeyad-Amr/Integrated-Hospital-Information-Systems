import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import {
    GetAllEmployeesUseCase,
    CreateEmployeeUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    GetEmployeeByIdUseCase,
    CreateEmployeeUseCaseParameters,
    UpdateEmployeeUseCaseParameters,
    DeleteEmployeeUseCaseParameters,
    GetEmployeeByIdUseCaseParameters
} from "@/modules/employees/domain/usecases";
import EmployeeEntity from "@/modules/employees/domain/entities/employee-entity";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";

//* Get All Employee Members 
export const getEmployeeList = createAsyncThunk(
    "employees/get",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAllEmployeesUseCase>(ServiceKeys.GetAllEmployeesUseCase).call();
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Create Employee Member
export const createEmployee = createAsyncThunk(
    "employees/create",
    async ({ data, authData }: { data: EmployeeEntity, authData: AuthDataEntity }, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            console.log('Thunk', data);
            const result = await sl.get<CreateEmployeeUseCase>(ServiceKeys.CreateEmployeeUseCase).call(
                new CreateEmployeeUseCaseParameters(data, authData)
            );
            console.log('Thunk', result);
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Update Employee Member
export const updateEmployee = createAsyncThunk(
    "employees/update",
    async ({ data, authData }: { data: EmployeeEntity, authData: AuthDataEntity }, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<UpdateEmployeeUseCase>(ServiceKeys.UpdateEmployeeUseCase).call(
                new UpdateEmployeeUseCaseParameters(data, authData)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Delete Employee Member
export const deleteEmployee = createAsyncThunk(
    "employees/delete",
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<DeleteEmployeeUseCase>(ServiceKeys.DeleteEmployeeUseCase).call(
                new DeleteEmployeeUseCaseParameters(id)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight() === true ? id : "";
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Get Employee Member Details by Id
export const getEmployeeDetails = createAsyncThunk(
    "employees/get/details",
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetEmployeeByIdUseCase>(ServiceKeys.GetEmployeeByIdUseCase).call(
                new GetEmployeeByIdUseCaseParameters(id)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

