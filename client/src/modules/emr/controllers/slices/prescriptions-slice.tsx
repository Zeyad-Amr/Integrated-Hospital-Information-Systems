import { createSlice } from "@reduxjs/toolkit";
import { PrescriptionsState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import PrescriptionsModel from "../../models/prescriptions-model";
import { PrescriptionsInterface } from "../../interfaces/prescriptions-interface";
import {
  createPrescription,
  deletePrescription,
  getPrescriptionDetails,
  getPrescriptionsList,
  updatePrescription,
} from "../thunks/prescriptions-thunk";

//* Initial State
const initialState: PrescriptionsState = {
  prescriptions: PaginatedListModel.default(),
  currentPrescription: PrescriptionsModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const prescriptionsSlice = createSlice({
  name: "prescriptions",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentPrescription(state) {
      state.currentPrescription = initialState.currentPrescription;
    },
    clearPrescriptionList(state) {
      state.prescriptions = initialState.prescriptions;
    },
    setCurrentPrescription(
      state,
      action: { payload: PrescriptionsInterface; type: string }
    ) {
      state.currentPrescription = action.payload;
    },
    setPrescriptionList(
      state,
      action: { payload: PrescriptionsInterface[]; type: string }
    ) {
      state.prescriptions.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all allergies from api
    builder.addCase(getPrescriptionsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPrescriptionsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.prescriptions = action.payload;
      state.error = "";
      console.log("getPrescriptionsList", action.payload);
    });
    builder.addCase(getPrescriptionsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.prescriptions = initialState.prescriptions;
    });

    //* create allergy
    builder.addCase(createPrescription.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createPrescription.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentPrescription = initialState.currentPrescription;
      state.prescriptions = PaginatedListModel.resetPaginatedList(
        state.prescriptions
      );
      state.error = "";
      AlertService.showAlert("تم اضافة وصفة طبية بنجاح", "success");
    });
    builder.addCase(createPrescription.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update allergy
    builder.addCase(updatePrescription.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updatePrescription.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentPrescription = initialState.currentPrescription;
      state.prescriptions = PaginatedListModel.resetPaginatedList(
        state.prescriptions
      );
      state.error = "";
      AlertService.showAlert("تم تحديث وصفة طبية بنجاح", "success");
    });
    builder.addCase(updatePrescription.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete allergy
    builder.addCase(deletePrescription.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePrescription.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.prescriptions = PaginatedListModel.resetPaginatedList(
        state.prescriptions
      );
      AlertService.showAlert("تم حذف وصفة طبية بنجاح", "success");
    });
    builder.addCase(deletePrescription.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single allergy details
    builder.addCase(getPrescriptionDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPrescriptionDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPrescription = action.payload;
      state.error = "";
    });
    builder.addCase(getPrescriptionDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentPrescription = initialState.currentPrescription;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setPrescriptionList,
  setCurrentPrescription,
  clearPrescriptionList,
  clearCurrentPrescription,
  clearError,
} = prescriptionsSlice.actions;
export default prescriptionsSlice.reducer;
