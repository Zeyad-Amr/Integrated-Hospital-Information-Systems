import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
  FilterQuery,
  PaginatedListModel,
} from "@/core/api";
import { PrimarySurveyInterface } from "../../interfaces/primary-survey-interface";
import PrimarySurveyModel from "../../models/primary-survey-model";

//*  Create primarySurvey
export const createPrimarySurvey = createAsyncThunk(
  "primarySurvey/create",
  async (data: PrimarySurveyInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.post(
        Endpoints.primarySurvey.create,
        PrimarySurveyModel.toJson(data)
      );
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Update primarySurvey
export const updatePrimarySurvey = createAsyncThunk(
  "primarySurvey/update",
  async (data: PrimarySurveyInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.patch(
        Endpoints.primarySurvey.update,
        PrimarySurveyModel.toJson(data),
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

//*  Get All primarySurveys
export const getPrimarySurveysList = createAsyncThunk(
  "primarySurvey/list",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.primarySurvey.list, {
        filters: filters,
      });
      console.log(response, "response");
      return PaginatedListModel.fromJson<PrimarySurveyInterface>(
        response.data,
        response.data.items.map((item: any) => PrimarySurveyModel.fromJson(item)),
        filters
      );
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get primarySurvey Details
export const getPrimarySurveyDetails = createAsyncThunk(
  "primarySurvey/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.primarySurvey.details, {
        pathVariables: { id: id },
      });
      return PrimarySurveyModel.fromJson(response.data);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Delete primarySurvey
export const deletePrimarySurvey = createAsyncThunk(
  "primarySurvey/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.delete(Endpoints.primarySurvey.delete, {
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
