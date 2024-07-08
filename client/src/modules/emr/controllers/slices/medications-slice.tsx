import { createSlice } from "@reduxjs/toolkit";
import { MedicationsState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import MedicationsModel from "../../models/medications-model";
import { MedicationsInterface } from "../../interfaces/medications-interface";
import {
  createMedication,
  deleteMedication,
  getFdaMedicationList,
  getMedicationDetails,
  getMedicationsList,
  updateMedication,
} from "../thunks/medications-thunk";

//* Initial State
const initialState: MedicationsState = {
  medications: PaginatedListModel.default(),
  currentMedication: MedicationsModel.defaultValues(),
  fdaMedications: [],
  isFetched: false,
  loading: false,
  error: "",
};

const medicationsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentMedication(state) {
      state.currentMedication = initialState.currentMedication;
    },
    clearMedicationList(state) {
      state.medications = initialState.medications;
    },
    setCurrentMedication(
      state,
      action: { payload: MedicationsInterface; type: string }
    ) {
      state.currentMedication = action.payload;
    },
    setMedicationList(
      state,
      action: { payload: MedicationsInterface[]; type: string }
    ) {
      state.medications.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all Medications from api
    builder.addCase(getMedicationsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getMedicationsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.medications = action.payload;
      state.error = "";
      console.log("getMedicationsList", action.payload);
    });
    builder.addCase(getMedicationsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.medications = initialState.medications;
    });

    //* get all FDA Medications from api
    builder.addCase(getFdaMedicationList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getFdaMedicationList?.fulfilled, (state, action) => {
      state.loading = false;
      state.fdaMedications = action.payload;
      state.error = "";
      console.log("getFdaMedicationList", action.payload);
    });
    builder.addCase(getFdaMedicationList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`The medication is not found`, "error");
      state.medications = initialState.medications;
    });

    //* create Medication
    builder.addCase(createMedication.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createMedication.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentMedication = initialState.currentMedication;
      state.medications = PaginatedListModel.resetPaginatedList(
        state.medications
      );
      state.error = "";
      AlertService.showAlert("تم اضافة دواء بنجاح", "success");
    });
    builder.addCase(createMedication.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update Medication
    builder.addCase(updateMedication.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateMedication.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentMedication = initialState.currentMedication;
      state.medications = PaginatedListModel.resetPaginatedList(
        state.medications
      );
      state.error = "";
      AlertService.showAlert("تم تحديث دواء بنجاح", "success");
    });
    builder.addCase(updateMedication.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete Medication
    builder.addCase(deleteMedication.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteMedication.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.medications = PaginatedListModel.resetPaginatedList(
        state.medications
      );
      AlertService.showAlert("تم حذف دواء بنجاح", "success");
    });
    builder.addCase(deleteMedication.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single Medication details
    builder.addCase(getMedicationDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getMedicationDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentMedication = action.payload;
      state.error = "";
    });
    builder.addCase(getMedicationDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentMedication = initialState.currentMedication;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setMedicationList,
  setCurrentMedication,
  clearMedicationList,
  clearCurrentMedication,
  clearError,
} = medicationsSlice.actions;
export default medicationsSlice.reducer;
