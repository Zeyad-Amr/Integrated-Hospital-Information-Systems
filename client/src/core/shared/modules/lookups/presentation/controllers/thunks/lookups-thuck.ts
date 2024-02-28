import { ServiceKeys, sl } from "@/core/service-locator";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetLookupsUseCase } from "../../../domain/usecases";

//* Get All Employee Members 
export const getLookups = createAsyncThunk(
    "lookups/get",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            // console.log('Get Lookups Start');
            const result = await sl.get<GetLookupsUseCase>(ServiceKeys.GetLookupsUseCase).call();
            // console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);
