import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllFeaturesUseCase from "@/modules/subdepartments-crud/domain/usecases/features/get-all-features-usecase";
import FeatureInterface from "@/modules/subdepartments-crud/domain/interfaces/feature-interface";
import CreateFeatureUseCase from "@/modules/subdepartments-crud/domain/usecases/features/create-feature-usecase";
import UpdateFeatureUseCase from "@/modules/subdepartments-crud/domain/usecases/features/update-feature-usecase";
import DeleteFeatureUseCase from "@/modules/subdepartments-crud/domain/usecases/features/delete-feature-usecase";
import GetFeatureUseCase from "@/modules/subdepartments-crud/domain/usecases/features/get-feature-by-Id-usecase";

//* Get All features
export const getFeaturesList = createAsyncThunk(
  "features/get",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllFeaturesUseCase>(ServiceKeys.GetAllFeaturesUseCase)
        .call();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Create feature
export const createFeature = createAsyncThunk(
  "features/create",
  async (data: FeatureInterface, thunkApi) => {
    const { rejectWithValue , dispatch  } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateFeatureUseCase>(ServiceKeys.CreateFeatureUseCase)
        .call(data).then(() => {
          dispatch(getFeaturesList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update feature
export const updateFeature = createAsyncThunk(
  "features/update",
  async (data: FeatureInterface, thunkApi) => {
    const { rejectWithValue , dispatch  } = thunkApi;
    try {
      const result = await sl
        .get<UpdateFeatureUseCase>(ServiceKeys.UpdateFeatureUseCase)
        .call(data).then(() => {
          dispatch(getFeaturesList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Delete feature
export const deleteFeature = createAsyncThunk(
  "features/delete",
  async (id: string, thunkApi) => {
    const { rejectWithValue , dispatch  } = thunkApi;
    try {
      const result = await sl
        .get<DeleteFeatureUseCase>(ServiceKeys.DeleteFeatureUseCase)
        .call(id).then(() => {
          dispatch(getFeaturesList())
        })
      console.log("Result:", result);
      return id;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Get Single feature Details by Id
export const getFeatureDetails = createAsyncThunk(
  "features/get/details",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetFeatureUseCase>(ServiceKeys.GetFeatureByIdUseCase)
        .call(id);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
