import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiClient, Endpoints, ErrorMessage, ErrorResponse } from "@/core/api";
import { TestInterface } from "../../interfaces/test-interface";
import TestModel from "../../models/test-model";

//* Test Create
export const createTestCase = createAsyncThunk(
  "test/create",
  async (data : TestInterface , thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const apiClient = new ApiClient();
    try {
      const response = await apiClient.post(Endpoints.role.create, TestModel.toJson(data));
      return response.data;  //* if it is a get method so you should handle response.data as TestModel.fromJson(response.data)
    } catch (error) {
      const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
      return rejectWithValue(errorResponse);
    }
  }
);
