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
import EmployeeInterface from "@/modules/employees/domain/interfaces/employee-interface";

//* Get All Employee Members 
export const getEmployeeList = createAsyncThunk(
    "employees/get",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAllEmployeesUseCase>(ServiceKeys.GetAllEmployeesUseCase).call();
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

//* Create Employee Member
export const createEmployee = createAsyncThunk(
    "employees/create",
    async (data: EmployeeInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            console.log('Thunk', data);
            const result = await sl.get<CreateEmployeeUseCase>(ServiceKeys.CreateEmployeeUseCase).call(
                new CreateEmployeeUseCaseParameters(data)
            );
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

//* Update Employee Member
export const updateEmployee = createAsyncThunk(
    "employees/update",
    async (data: EmployeeInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<UpdateEmployeeUseCase>(ServiceKeys.UpdateEmployeeUseCase).call(
                new UpdateEmployeeUseCaseParameters(data)
            );
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
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
            console.log('Result:', result);
            return id;
        } catch (error) {
            console.log('Error:', error);
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
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

