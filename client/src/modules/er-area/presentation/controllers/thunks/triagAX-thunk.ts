import { TriageAXInterface } from "@/modules/er-area/domain/interfaces/triageAX-interface";
import CreateTriageAXUseCase from "@/modules/er-area/domain/usecases/create-triageAX-usecase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";

interface CreateTriageAXInterface {
  assessment: TriageAXInterface
  visitCode: string
}

export const createTriagAX = createAsyncThunk(
  "triagAX/create",
  async (data: CreateTriageAXInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateTriageAXUseCase>(ServiceKeys.CreateTriageAXUseCase)
        .call(data.assessment, data.visitCode);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
