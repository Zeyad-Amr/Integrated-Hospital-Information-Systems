import { TriageAXInterface } from "@/modules/er-area/domain/interfaces/triageAX-interface";
import CreateTriageAXUseCase from "@/modules/er-area/domain/usecases/create-triageAX-usecase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";

export const createTriagAX = createAsyncThunk(
  "triagAX/create",
  async (data: TriageAXInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateTriageAXUseCase>(ServiceKeys.CreateTriageAXUseCase)
        .call(data);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
