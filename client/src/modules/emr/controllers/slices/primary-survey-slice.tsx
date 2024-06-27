import { createSlice } from "@reduxjs/toolkit";
import { PrimarySurveyState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import PrimarySurveyModel from "../../models/primary-survey-model";
import { PrimarySurveyInterface } from "../../interfaces/primary-survey-interface";
import { createPrimarySurvey, deletePrimarySurvey, getPrimarySurveyDetails, getPrimarySurveysList, updatePrimarySurvey } from "../thunks/primary-survey-thunk";

//* Initial State
const initialState: PrimarySurveyState = {
  primarySurveys: PaginatedListModel.default(),
  currentPrimarySurvey: PrimarySurveyModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const primarySurveySlice = createSlice({
  name: "primarySurveys",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentPrimarySurvey(state) {
      state.currentPrimarySurvey = initialState.currentPrimarySurvey;
    },
    clearPrimarySurveyList(state) {
      state.primarySurveys = initialState.primarySurveys;
    },
    setCurrentPrimarySurvey(
      state,
      action: { payload: PrimarySurveyInterface; type: string }
    ) {
      state.currentPrimarySurvey = action.payload;
    },
    setPrimarySurveyList(
      state,
      action: { payload: PrimarySurveyInterface[]; type: string }
    ) {
      state.primarySurveys.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all primarySurveys from api
    builder.addCase(getPrimarySurveysList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPrimarySurveysList?.fulfilled, (state, action) => {
      state.loading = false;
      state.primarySurveys = action.payload;
      state.error = "";
      console.log("getPrimarySurveysList", action.payload);
    });
    builder.addCase(getPrimarySurveysList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.primarySurveys = initialState.primarySurveys;
    });

    //* create primarySurvey
    builder.addCase(createPrimarySurvey.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createPrimarySurvey.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentPrimarySurvey = initialState.currentPrimarySurvey;
      state.primarySurveys = PaginatedListModel.resetPaginatedList(state.primarySurveys);
      state.error = "";
      AlertService.showAlert("تم اضافة المسح الأولي بنجاح", "success");
    });
    builder.addCase(createPrimarySurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update primarySurvey
    builder.addCase(updatePrimarySurvey.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updatePrimarySurvey.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentPrimarySurvey = initialState.currentPrimarySurvey;
      state.primarySurveys = PaginatedListModel.resetPaginatedList(state.primarySurveys);
      state.error = "";
      AlertService.showAlert("تم تحديث المسح الأولي بنجاح", "success");
    });
    builder.addCase(updatePrimarySurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete primarySurvey
    builder.addCase(deletePrimarySurvey.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePrimarySurvey.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.primarySurveys = PaginatedListModel.resetPaginatedList(state.primarySurveys);
      AlertService.showAlert("تم حذف المسح الأولي بنجاح", "success");
    });
    builder.addCase(deletePrimarySurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single primarySurvey details
    builder.addCase(getPrimarySurveyDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPrimarySurveyDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPrimarySurvey = action.payload;
      state.error = "";
    });
    builder.addCase(getPrimarySurveyDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentPrimarySurvey = initialState.currentPrimarySurvey;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setPrimarySurveyList,
  setCurrentPrimarySurvey,
  clearPrimarySurveyList,
  clearCurrentPrimarySurvey,
  clearError,
} = primarySurveySlice.actions;
export default primarySurveySlice.reducer;
