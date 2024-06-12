import { createSlice } from "@reduxjs/toolkit";
import { ComplaintsState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import ComplaintsModel from "../../models/complaints-model";
import { ComplaintsInterface } from "../../interfaces/complaints-interface";
import {
    getComplaintDetails,
    updateComplaint,
} from "../thunks/complaints-thunk";

//* Initial State
const initialState: ComplaintsState = {
    complaints: PaginatedListModel.default(),
    currentComplaint: ComplaintsModel.defaultValues(),
    isFetched: false,
    loading: false,
    error: "",
};

const complaintsSlice = createSlice({
    name: "complaints",
    initialState,
    reducers: {
        clearError(state) {
            state.error = "";
        },
        clearCurrentComplaint(state) {
            state.currentComplaint = initialState.currentComplaint;
        },
        clearComplaintList(state) {
            state.complaints = initialState.complaints;
        },
        setCurrentComplaint(
            state,
            action: { payload: ComplaintsInterface; type: string }
        ) {
            state.currentComplaint = action.payload;
        },
        setComplaintList(
            state,
            action: { payload: ComplaintsInterface[]; type: string }
        ) {
            state.complaints.items = action.payload;
        },
        setLoading(state, action: { payload: boolean; type: string }) {
            state.loading = action.payload;
        },
    },
    extraReducers(builder) {

        //* update allergy
        builder.addCase(updateComplaint.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateComplaint.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentComplaint = initialState.currentComplaint;
            state.complaints = PaginatedListModel.resetPaginatedList(state.complaints);
            state.error = "";
            AlertService.showAlert("تم تحديث الشكوى بنجاح", "success");
        });
        builder.addCase(updateComplaint.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, "error");
        });

        //* get single allergy details
        builder.addCase(getComplaintDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getComplaintDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentComplaint = action.payload;
            state.error = "";
        });
        builder.addCase(getComplaintDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentComplaint = initialState.currentComplaint;
            AlertService.showAlert(`${state.error}`, "error");
        });
    },
});

export const {
    setLoading,
    setComplaintList,
    setCurrentComplaint,
    clearComplaintList,
    clearCurrentComplaint,
    clearError,
} = complaintsSlice.actions;
export default complaintsSlice.reducer;
