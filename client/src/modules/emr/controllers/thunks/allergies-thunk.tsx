import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
  FilterQuery,
  PaginatedListModel,
} from "@/core/api";
import { AllergiesInterface } from "../../interfaces/allergies-interface";
import AllergiesModel from "../../models/allergies-model";

//*  Create Allergy
export const createAllergy = createAsyncThunk(
  "allergy/create",
  async (data: AllergiesInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.post(
        Endpoints.allergy.create,
        AllergiesModel.toJson(data)
      );
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Update Allergy
export const updateAllergy = createAsyncThunk(
  "allergy/update",
  async (data: AllergiesInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.patch(
        Endpoints.allergy.update,
        AllergiesModel.toJson(data),
        {
          pathVariables: { id: data.id },
        }
      );
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get All Allergies
export const getAllergiesList = createAsyncThunk(
  "allergy/list",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.allergy.list, {
        filters: filters,
      });
      console.log(response, "response");
      return PaginatedListModel.fromJson<AllergiesInterface>(
        response.data,
        response.data.items.map((item: any) => AllergiesModel.fromJson(item)),
        filters
      );
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Allergy Details
export const getAllergyDetails = createAsyncThunk(
  "allergy/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.allergy.details, {
        pathVariables: { id: id },
      });
      return AllergiesModel.fromJson(response.data);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Delete Allergy
export const deleteAllergy = createAsyncThunk(
  "allergy/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.delete(Endpoints.allergy.delete, {
        pathVariables: { id: id },
      });
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);
