import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import {
    LoginUseCase,
    GetMeUseCase,
    LoginUseCaseParameters
} from "../../../domain/usecases";
import AuthDataEntity from "@/modules/auth/domain/entities/auth-data-entity";


//* Login
export const login = createAsyncThunk(
    "auth/login",
    async (_data: AuthDataEntity, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<LoginUseCase>(ServiceKeys.LoginUseCase).call(
                new LoginUseCaseParameters(_data)
            );
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

//* Get Me
export const getMe = createAsyncThunk(
    "auth/me",
    async (_id, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetMeUseCase>(ServiceKeys.GetMeUseCase).call();
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

