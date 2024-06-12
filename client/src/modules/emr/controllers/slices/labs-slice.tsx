import { createSlice } from "@reduxjs/toolkit";
import { LabsState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import LabsModel from "../../models/labs-model";
import { LabsInterface } from "../../interfaces/labs-interface";
import {
  getLabsList,
  createLab,
  deleteLab,
  getLabDetails,
  updateLab,
} from "../thunks/labs-thunk";

//* Initial State
const initialState: LabsState = {
  labs: PaginatedListModel.default(),
  currentLab: LabsModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const labsSlice = createSlice({
  name: "labs",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentLab(state) {
      state.currentLab = initialState.currentLab;
    },
    clearLabList(state) {
      state.labs = initialState.labs;
    },
    setCurrentLab(
      state,
      action: { payload: LabsInterface; type: string }
    ) {
      state.currentLab = action.payload;
    },
    setLabList(
      state,
      action: { payload: LabsInterface[]; type: string }
    ) {
      state.labs.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all labs from api
    builder.addCase(getLabsList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getLabsList?.fulfilled, (state, action) => {
      state.loading = false;
      state.labs = action.payload;
      state.error = "";
      console.log("getLabsList", action.payload);
    });
    builder.addCase(getLabsList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.labs = initialState.labs;
    });

    //* create allergy
    builder.addCase(createLab.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createLab.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentLab = initialState.currentLab;
      state.labs = PaginatedListModel.resetPaginatedList(state.labs);
      state.error = "";
      AlertService.showAlert("تم اضافة القياسات الحيوية", "success");
    });
    builder.addCase(createLab.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update allergy
    builder.addCase(updateLab.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateLab.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentLab = initialState.currentLab;
      state.labs = PaginatedListModel.resetPaginatedList(state.labs);
      state.error = "";
      AlertService.showAlert("تم تحديث القياسات الحيوية بنجاح", "success");
    });
    builder.addCase(updateLab.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete allergy
    builder.addCase(deleteLab.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteLab.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.labs = PaginatedListModel.resetPaginatedList(state.labs);
      AlertService.showAlert("تم حذف القياسات الحيوية بنجاح", "success");
    });
    builder.addCase(deleteLab.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single allergy details
    builder.addCase(getLabDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getLabDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentLab = action.payload;
      state.error = "";
    });
    builder.addCase(getLabDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentLab = initialState.currentLab;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setLabList,
  setCurrentLab,
  clearLabList,
  clearCurrentLab,
  clearError,
} = labsSlice.actions;
export default labsSlice.reducer;
