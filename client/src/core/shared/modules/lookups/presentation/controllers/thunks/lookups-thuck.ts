import { ServiceKeys, sl } from "@/core/service-locator";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetLookupsUseCase } from "../../../domain/usecases";
import { LookupsState } from "../types";

//* Get All Employee Members 
export const getLookups = createAsyncThunk(
    "lookups/get",
    async (_data, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi;
        try {

            // get lookups state
            const lookupsState: LookupsState = (getState() as any).lookups;

            // check if lookups already loaded
            if (lookupsState.isFetched) {
                console.log('Lookups already loaded:', lookupsState.lookups);
                return lookupsState.lookups;
            }

            // call get lookups usecase
            const result = await sl.get<GetLookupsUseCase>(ServiceKeys.GetLookupsUseCase).call();
            console.log('Lookups fetched:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);
