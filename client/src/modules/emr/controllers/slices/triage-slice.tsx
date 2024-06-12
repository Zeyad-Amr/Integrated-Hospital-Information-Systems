import { createSlice } from "@reduxjs/toolkit";
import { TriageState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import TriageModel from "../../models/triage-model";
import { TriageInterface } from "../../interfaces/triage-interface";
import {
  getTriageList,
  createTriage,
  deleteTriage,
  getTriageDetails,
  updateTriage,
} from "../thunks/triage-thunk";

//* Initial State
const initialState: TriageState = {
  assessments: PaginatedListModel.default(),
  currentAssessment: TriageModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentTriage(state) {
      state.currentAssessment = initialState.currentAssessment;
    },
    clearTriageList(state) {
      state.assessments = initialState.assessments;
    },
    setCurrentTriage(
      state,
      action: { payload: TriageInterface; type: string }
    ) {
      state.currentAssessment = action.payload;
    },
    setTriageList(
      state,
      action: { payload: TriageInterface[]; type: string }
    ) {
      state.assessments.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all assessments from api
    builder.addCase(getTriageList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTriageList?.fulfilled, (state, action) => {
      state.loading = false;
      state.assessments = action.payload;
      state.error = "";
      console.log("getTriageList", action.payload);
    });
    builder.addCase(getTriageList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.assessments = initialState.assessments;
    });

    //* create allergy
    builder.addCase(createTriage.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createTriage.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentAssessment = initialState.currentAssessment;
      state.assessments = PaginatedListModel.resetPaginatedList(state.assessments);
      state.error = "";
      AlertService.showAlert("تم اضافة التشخيص الميدئي بنجاح", "success");
    });
    builder.addCase(createTriage.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update allergy
    builder.addCase(updateTriage.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateTriage.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentAssessment = initialState.currentAssessment;
      state.assessments = PaginatedListModel.resetPaginatedList(state.assessments);
      state.error = "";
      AlertService.showAlert("تم تحديث التشخيص الميدئي بنجاح", "success");
    });
    builder.addCase(updateTriage.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete allergy
    builder.addCase(deleteTriage.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteTriage.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.assessments = PaginatedListModel.resetPaginatedList(state.assessments);
      AlertService.showAlert("تم حذف التشخيص الميدئي بنجاح", "success");
    });
    builder.addCase(deleteTriage.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single allergy details
    builder.addCase(getTriageDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTriageDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentAssessment = action.payload;
      state.error = "";
    });
    builder.addCase(getTriageDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentAssessment = initialState.currentAssessment;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setTriageList,
  setCurrentTriage,
  clearTriageList,
  clearCurrentTriage,
  clearError,
} = assessmentsSlice.actions;
export default assessmentsSlice.reducer;
