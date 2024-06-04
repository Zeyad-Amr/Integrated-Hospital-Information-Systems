import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import {
    LoginUseCase,
    GetMeUseCase
} from "../../../domain/usecases";
import AuthInterface from "@/modules/auth/domain/interfaces/auth-interface";
import { getLookups } from "@/core/shared/modules/lookups/presentation/controllers/thunks/lookups-thuck";


//* Login
export const login = createAsyncThunk(
    "auth/login",
    async (data: AuthInterface, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        try {
            const result = await sl.get<LoginUseCase>(ServiceKeys.LoginUseCase).call(
                data
            ).then((_res) => {
                dispatch(getMe());
                dispatch(getLookups());
            });
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

