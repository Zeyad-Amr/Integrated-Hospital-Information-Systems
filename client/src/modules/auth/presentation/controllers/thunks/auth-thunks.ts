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

//* Get Me
export const getMe = createAsyncThunk(
    "auth/me",
    async (_id, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetMeUseCase>(ServiceKeys.GetMeUseCase).call();
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

