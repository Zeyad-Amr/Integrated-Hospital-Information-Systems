import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllSpecializationsUseCase from "@/modules/management/domain/usecases/specializations/get-all-specializations-usecase";
import SpecializationInterface from "@/modules/management/domain/interfaces/specialization -interface";
import CreatespecializationUseCase from "@/modules/management/domain/usecases/specializations/create-specialization-usecase";
import {
  CreateSpecializationUseCaseParameters,
  DeleteSpecializationUseCaseParameters,
  GetSpecializationByIdUseCaseParameters,
  UpdateSpecializationUseCaseParameters,
} from "@/modules/management/domain/usecases/specializations/usecase-params";
import UpdateSpecializationUseCase from "@/modules/management/domain/usecases/specializations/update-specialization-usecase";
import DeleteSpecializationUseCase from "@/modules/management/domain/usecases/specializations/delete-specialization-usecase";
import GetSpecializationByIdUseCase from "@/modules/management/domain/usecases/specializations/get-specialization-by-Id-usecase";
import { FilterQuery } from "@/core/api";

//* Get All Specializations
export const getSpecializationList = createAsyncThunk(
  "specializations/get",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllSpecializationsUseCase>(
          ServiceKeys.GetAllSpecializationsUseCase
        )
        .call(filters);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Create Specialization
export const createSpecialization = createAsyncThunk(
  "specializations/create",
  async (data: SpecializationInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreatespecializationUseCase>(
          ServiceKeys.CreateSpecializationUseCase
        )
        .call(new CreateSpecializationUseCaseParameters(data));
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update Specialization
export const updateSpecializations = createAsyncThunk(
  "specializations/update",
  async (data: SpecializationInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<UpdateSpecializationUseCase>(
          ServiceKeys.UpdateSpecializationUseCase
        )
        .call(new UpdateSpecializationUseCaseParameters(data));
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Delete Specialization
export const deleteSpecialization = createAsyncThunk(
  "specializations/delete",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<DeleteSpecializationUseCase>(
          ServiceKeys.DeleteSpecializationUseCase
        )
        .call(new DeleteSpecializationUseCaseParameters(id));
      console.log("Result:", result);
      return id;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Get Single Specialization Details by Id
export const getSpecializationDetails = createAsyncThunk(
  "specializations/get/details",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetSpecializationByIdUseCase>(
          ServiceKeys.GetSpecializationByIdUseCase
        )
        .call(new GetSpecializationByIdUseCaseParameters(id));
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
