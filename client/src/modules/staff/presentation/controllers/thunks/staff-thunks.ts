import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import { GetAllStaffMembersUseCase } from "@/modules/staff/domain/usecases";
export const getStaffList = createAsyncThunk(
    "staff/get",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAllStaffMembersUseCase>(ServiceKeys.GetAllStaffMembersUseCase).call();
            // result.fold(
            //     (error) => console.log(error),
            //     (success) => console.log(success)
            // );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


