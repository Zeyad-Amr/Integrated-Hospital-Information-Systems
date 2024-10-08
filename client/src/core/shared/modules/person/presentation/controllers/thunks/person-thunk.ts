import { ServiceKeys, sl } from "@/core/service-locator";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPersonUseCase } from "../../../domain/usecases";

//* Get All Employee Members 
export const getPerson = createAsyncThunk(
    "person/get",
    async (data: any, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            console.log('Get Person');
            const result = await sl.get<GetPersonUseCase>(ServiceKeys.GetPersonUseCase).call(data.ssn);
            console.log('P_Result:', result);
            return result;
        } catch (error) {
            console.log('P_Error:', error);
            return rejectWithValue(error);
        }
    }
);
