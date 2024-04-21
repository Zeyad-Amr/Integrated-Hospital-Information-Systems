import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllDepartmentsUseCase from "@/modules/subdepartments-crud/domain/usecases/departments/get-all-departments-usecase";

//* Get All Departments
export const getDepartmentsList = createAsyncThunk(
  "rooms/get",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllDepartmentsUseCase>(ServiceKeys.GetAllDepartmentsUseCase)
        .call();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);


