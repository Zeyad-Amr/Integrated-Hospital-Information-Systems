import { createSlice } from "@reduxjs/toolkit";
import { DiagnosisState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import DiagnosisModel from "../../models/diagnosis-model";
import { DiagnosisInterface } from "../../interfaces/diagnosis-interface";
import { createDiagnosis, deleteDiagnosis, getDiagnosesList, getDiagnosisDetails, updateDiagnosis } from "../thunks/diagnosis-thunk";

//* Initial State
const initialState: DiagnosisState = {
  diagnosesList: PaginatedListModel.default(),
  currentDiagnosis: DiagnosisModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentDiagnosis(state) {
      state.currentDiagnosis = initialState.currentDiagnosis;
    },
    clearDiagnosisList(state) {
      state.diagnosesList = initialState.diagnosesList;
    },
    setCurrentDiagnosis(
      state,
      action: { payload: DiagnosisInterface; type: string }
    ) {
      state.currentDiagnosis = action.payload;
    },
    setDiagnosisList(
      state,
      action: { payload: DiagnosisInterface[]; type: string }
    ) {
      state.diagnosesList.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all Diagnosis from api
    builder.addCase(getDiagnosesList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getDiagnosesList?.fulfilled, (state, action) => {
      state.loading = false;
      state.diagnosesList = action.payload;
      state.error = "";
      console.log("getDiagnosesList", action.payload);
    });
    builder.addCase(getDiagnosesList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.diagnosesList = initialState.diagnosesList;
    });

    //* create Diagnosis
    builder.addCase(createDiagnosis.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createDiagnosis.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentDiagnosis = initialState.currentDiagnosis;
      state.diagnosesList = PaginatedListModel.resetPaginatedList(state.diagnosesList);
      state.error = "";
      AlertService.showAlert("تم اضافة تشخيص بنجاح", "success");
    });
    builder.addCase(createDiagnosis.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update Diagnosis
    builder.addCase(updateDiagnosis.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateDiagnosis.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentDiagnosis = initialState.currentDiagnosis;
      state.diagnosesList = PaginatedListModel.resetPaginatedList(state.diagnosesList);
      state.error = "";
      AlertService.showAlert("تم تحديث تشخيص بنجاح", "success");
    });
    builder.addCase(updateDiagnosis.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete Diagnosis
    builder.addCase(deleteDiagnosis.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteDiagnosis.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.diagnosesList = PaginatedListModel.resetPaginatedList(state.diagnosesList);
      AlertService.showAlert("تم حذف تشخيص بنجاح", "success");
    });
    builder.addCase(deleteDiagnosis.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single Diagnosis details
    builder.addCase(getDiagnosisDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getDiagnosisDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentDiagnosis = action.payload;
      state.error = "";
    });
    builder.addCase(getDiagnosisDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentDiagnosis = initialState.currentDiagnosis;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setDiagnosisList,
  setCurrentDiagnosis,
  clearDiagnosisList,
  clearCurrentDiagnosis,
  clearError,
} = diagnosisSlice.actions;
export default diagnosisSlice.reducer;
