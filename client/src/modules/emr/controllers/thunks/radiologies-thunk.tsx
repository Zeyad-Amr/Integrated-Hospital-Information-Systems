import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
  FilterQuery,
  PaginatedListModel,
} from "@/core/api";
import { RadiologiesInterface } from "../../interfaces/radiologies-interface";
import RadiologiesModel from "../../models/radiologies-model";

//*  Create Radiology
export const createRadiology = createAsyncThunk(
  "radiologies/create",
  async (data: RadiologiesInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.post(
        Endpoints.radiologies.create,
        RadiologiesModel.toJson(data)
      );
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Update Radiology
export const updateRadiology = createAsyncThunk(
  "radiologies/update",
  async (data: RadiologiesInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.patch(
        Endpoints.radiologies.update,
        RadiologiesModel.toJson(data),
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

//*  Get All Radiologies
export const getRadiologiesList = createAsyncThunk(
  "radiologies/list",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.radiologies.list, {
        filters: filters,
      });
      console.log(response, "response");
      return PaginatedListModel.fromJson<RadiologiesInterface>(
        response.data,
        response.data.items.map((item: any) => RadiologiesModel.fromJson(item)),
        filters
      );
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Radiology Details
export const getRadiologyDetails = createAsyncThunk(
  "radiologies/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.radiologies.details, {
        pathVariables: { id: id },
      });
      return RadiologiesModel.fromJson(response.data);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Delete Radiology
export const deleteRadiology = createAsyncThunk(
  "radiologies/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.delete(Endpoints.radiologies.delete, {
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
