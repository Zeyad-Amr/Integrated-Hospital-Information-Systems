import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import {
    UpdateVisitUseCaseParameters,
    GetVisitByCodeUseCaseParameters,
    CreateVisitUseCase,
    UpdateVisitUseCase,
    GetAnonymousVisitUseCase,
    GetVisitByCodeUseCase
} from "../../../domain/usecases";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";


//* Create Visit
export const createVisit = createAsyncThunk(
    "registration/create",
    async (data: VisitInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            console.log(data)
            const result = await sl.get<CreateVisitUseCase>(ServiceKeys.CreateVisitUseCase).call(data)
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

//* Update Visit
export const updateVisit = createAsyncThunk(
    "registration/update",
    async (_data: VisitInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<UpdateVisitUseCase>(ServiceKeys.UpdateVisitUseCase).call(
                new UpdateVisitUseCaseParameters(_data)

            );
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);


//* Get Anonymous Registration
export const getAnonymousVisits = createAsyncThunk(
    "registration/getAnonymousVisits",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAnonymousVisitUseCase>(ServiceKeys.GetAnonymousVisitUseCase).call();
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

//* Get Visit By Code
export const getVisitByCode = createAsyncThunk(
    "registration/getVisitByCode",
    async (_data: string, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetVisitByCodeUseCase>(ServiceKeys.GetVisitByCodeUseCase).call(
                new GetVisitByCodeUseCaseParameters(_data)
            );
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);
