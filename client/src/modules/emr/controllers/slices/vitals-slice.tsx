import { createSlice } from "@reduxjs/toolkit";
import { VitalsState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import VitalsModel from "../../models/vitals-model";
import { VitalsInterface } from "../../interfaces/vitals-interface";
import {
  getVitalsList,
  createVital,
  deleteVital,
  getVitalDetails,
  updateVital,
} from "../thunks/vitals-thunk";

//* Initial State
const initialState: VitalsState = {
  vitals: PaginatedListModel.default(),
  currentVital: VitalsModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const vitalsSlice = createSlice({
  name: "vitals",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentVital(state) {
      state.currentVital = initialState.currentVital;
    },
    clearVitalList(state) {
      state.vitals = initialState.vitals;
    },
    setCurrentVital(
      state,
      action: { payload: VitalsInterface; type: string }
    ) {
      state.currentVital = action.payload;
    },
    setVitalList(
      state,
      action: { payload: VitalsInterface[]; type: string }
    ) {
      state.vitals.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all vitals from api
    builder.addCase(getVitalsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getVitalsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.vitals = action.payload;
      state.error = "";
      console.log("getVitalsList", action.payload);
    });
    builder.addCase(getVitalsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.vitals = initialState.vitals;
    });

    //* create allergy
    builder.addCase(createVital.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createVital.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentVital = initialState.currentVital;
      state.vitals = PaginatedListModel.resetPaginatedList(state.vitals);
      state.error = "";
      AlertService.showAlert("تم اضافة القياسات الحيوية بنجاح", "success");
    });
    builder.addCase(createVital.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update allergy
    builder.addCase(updateVital.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateVital.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentVital = initialState.currentVital;
      state.vitals = PaginatedListModel.resetPaginatedList(state.vitals);
      state.error = "";
      AlertService.showAlert("تم تحديث القياسات الحيوية بنجاح", "success");
    });
    builder.addCase(updateVital.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete allergy
    builder.addCase(deleteVital.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteVital.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.vitals = PaginatedListModel.resetPaginatedList(state.vitals);
      AlertService.showAlert("تم حذف القياسات الحيوية بنجاح", "success");
    });
    builder.addCase(deleteVital.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single allergy details
    builder.addCase(getVitalDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getVitalDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVital = action.payload;
      state.error = "";
    });
    builder.addCase(getVitalDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentVital = initialState.currentVital;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setVitalList,
  setCurrentVital,
  clearVitalList,
  clearCurrentVital,
  clearError,
} = vitalsSlice.actions;
export default vitalsSlice.reducer;
