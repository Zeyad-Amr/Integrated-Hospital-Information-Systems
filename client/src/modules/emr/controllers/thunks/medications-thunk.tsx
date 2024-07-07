import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiClient,
  Endpoints,
  ErrorMessage,
  ErrorResponse,
  FilterQuery,
  PaginatedListModel,
} from "@/core/api";
import { MedicationsInterface } from "../../interfaces/medications-interface";
import MedicationsModel from "../../models/medications-model";
import axios from "axios";

//*  Create Medication
export const createMedication = createAsyncThunk(
  "medication/create",
  async (data: MedicationsInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.post(
        Endpoints.medication.create,
        MedicationsModel.toJson(data)
      );
      return true;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get FDA Medications
export const getFdaMedicationList = createAsyncThunk(
  "medication/FDA/list",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
     const response = await axios.post(
        'https://api.fda.gov/drug/drugsfda.json?search=products.marketing_status&limit=5'
      )
      console.log(response,'response');
      return response.data;
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Update Medication
export const updateMedication = createAsyncThunk(
  "medication/update",
  async (data: MedicationsInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.patch(
        Endpoints.medication.update,
        MedicationsModel.toJson(data),
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

//*  Get All Medications
export const getMedicationsList = createAsyncThunk(
  "medication/list",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.medication.list, {
        filters: filters,
      });
      console.log(response, "response");
      return PaginatedListModel.fromJson<MedicationsInterface>(
        response.data,
        response.data.items.map((item: any) => MedicationsModel.fromJson(item)),
        filters
      );
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Get Medication Details
export const getMedicationDetails = createAsyncThunk(
  "medication/details",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.get(Endpoints.medication.details, {
        pathVariables: { id: id },
      });
      return MedicationsModel.fromJson(response.data);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);

//*  Delete Medication
export const deleteMedication = createAsyncThunk(
  "medication/delete",
  async (id: string | number, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      await apiClient.delete(Endpoints.medication.delete, {
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
