import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
  FilterQuery,
  PaginatedListModel,
} from "@/core/api";
import { MedicalProblemsInterface } from "../../interfaces/medical-problems-interface";
import MedicalProblemsModel from "../../models/medical-problems-model";

//*  Create Medical problem
export const createMedicalProblem = createAsyncThunk(
  "medicalProblems/create",
  async (data: MedicalProblemsInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.post(
        Endpoints.medicalProblem.create,
        MedicalProblemsModel.toJson(data)
      );
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Update Medical problem
export const updateMedicalProblem = createAsyncThunk(
  "medicalProblems/update",
  async (data: MedicalProblemsInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.patch(
        Endpoints.medicalProblem.update,
        MedicalProblemsModel.toJson(data),
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

//*  Get All Medical problems
export const getMedicalProblemsList = createAsyncThunk(
  "medicalProblems/list",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.medicalProblem.list, {
        filters: filters,
      });
      console.log(response, "response");
      return PaginatedListModel.fromJson<MedicalProblemsInterface>(
        response.data,
        response.data.items.map((item: any) => MedicalProblemsModel.fromJson(item)),
        filters
      );
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Medical problem Details
export const getMedicalProblemDetails = createAsyncThunk(
  "medicalProblems/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.medicalProblem.details, {
        pathVariables: { id: id },
      });
      return MedicalProblemsModel.fromJson(response.data);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Delete Medical problem
export const deleteMedicalProblem = createAsyncThunk(
  "medicalProblems/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.delete(Endpoints.medicalProblem.delete, {
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
