import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ApiClient,
    Endpoints,
    ErrorMessage,
    ErrorResponse,
    FilterQuery,
    PaginatedListModel,
} from "@/core/api";
import { ComplaintsInterface } from "../../interfaces/complaints-interface";
import ComplaintsModel from "../../models/complaints-model";

//*  Update Complaint
export const updateComplaint = createAsyncThunk(
    "complaints/update",
    async (data: ComplaintsInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        const apiClient = new ApiClient();
        try {
            await apiClient.patch(
                Endpoints.visit.details,
                ComplaintsModel.toJson(data),
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

//*  Get Complaint Details
export const getComplaintDetails = createAsyncThunk(
    "complaints/details",
    async (id: string | number, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        const apiClient = new ApiClient();
        try {
            const response = await apiClient.get(Endpoints.visit.details, {
                pathVariables: { id: id },
            });
            return ComplaintsModel.fromJson(response.data);
        } catch (error) {
            const errorResponse: ErrorResponse =
                error instanceof Error ? ErrorMessage.get(error.message) : error;
            return rejectWithValue(errorResponse);
        }
    }
);

