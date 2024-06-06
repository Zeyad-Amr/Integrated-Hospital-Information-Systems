import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";
import { FilterQuery } from "@/core/api/filters";
import {
    GetVisitByCodeUseCaseParameters,
    CreateVisitUseCase,
    UpdateVisitUseCase,
    GetAnonymousVisitUseCase,
    GetVisitByCodeUseCase
} from "@/modules/registration/domain/usecases/visit";
import { CompleteVisitInterface } from "@/modules/registration/domain/interfaces/complete-visit-interface";

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
export const updateVisitPatient = createAsyncThunk(
    "registration/visit/update",
    async (data: CompleteVisitInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<UpdateVisitUseCase>(ServiceKeys.UpdateVisitUseCase).call(data);
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
    async (filters: FilterQuery[], thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {

            const result = await sl.get<GetAnonymousVisitUseCase>(ServiceKeys.GetAnonymousVisitUseCase).call(filters);
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
