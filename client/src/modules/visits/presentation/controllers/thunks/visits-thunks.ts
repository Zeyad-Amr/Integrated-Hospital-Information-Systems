import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import {
    CreateVisitUseCaseParameters,
    UpdateVisitUseCaseParameters,
    GetVisitByCodeUseCaseParameters,
    CreateVisitUseCase,
    UpdateVisitUseCase,
    GetAnonymousVisitsUseCase,
    GetVisitByCodeUseCase
} from "../../../domain/usecases";
import VisitEntity from "@/modules/visits/domain/entities/visit-entity";


//* Create Visit
export const createVisit = createAsyncThunk(
    "visits/create",
    async (_data: VisitEntity, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<CreateVisitUseCase>(ServiceKeys.CreateVisitUseCase).call(
                new CreateVisitUseCaseParameters(_data)
            );
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
    "visits/update",
    async (_data: VisitEntity, thunkApi) => {
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


//* Get Anonymous Visits
export const getAnonymousVisits = createAsyncThunk(
    "visits/getAnonymousVisits",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAnonymousVisitsUseCase>(ServiceKeys.GetAnonymousVisitsUseCase).call();
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
    "visits/getVisitByCode",
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
