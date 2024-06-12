import { createSlice } from "@reduxjs/toolkit";
import { RadiologiesState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import RadiologiesModel from "../../models/radiologies-model";
import { RadiologiesInterface } from "../../interfaces/radiologies-interface";
import {
  getRadiologiesList,
  createRadiology,
  deleteRadiology,
  getRadiologyDetails,
  updateRadiology,
} from "../thunks/radiologies-thunk";

//* Initial State
const initialState: RadiologiesState = {
  radiologies: PaginatedListModel.default(),
  currentRadiology: RadiologiesModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const radiologiesSlice = createSlice({
  name: "radiologies",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentRadiology(state) {
      state.currentRadiology = initialState.currentRadiology;
    },
    clearRadiologyList(state) {
      state.radiologies = initialState.radiologies;
    },
    setCurrentRadiology(
      state,
      action: { payload: RadiologiesInterface; type: string }
    ) {
      state.currentRadiology = action.payload;
    },
    setRadiologyList(
      state,
      action: { payload: RadiologiesInterface[]; type: string }
    ) {
      state.radiologies.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all radiologies from api
    builder.addCase(getRadiologiesList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getRadiologiesList?.fulfilled, (state, action) => {
      state.loading = false;
      state.radiologies = action.payload;
      state.error = "";
      console.log("getRadiologiesList", action.payload);
    });
    builder.addCase(getRadiologiesList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.radiologies = initialState.radiologies;
    });

    //* create allergy
    builder.addCase(createRadiology.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createRadiology.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentRadiology = initialState.currentRadiology;
      state.radiologies = PaginatedListModel.resetPaginatedList(state.radiologies);
      state.error = "";
      AlertService.showAlert("تم اضافة الاشعة بنجاح", "success");
    });
    builder.addCase(createRadiology.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update allergy
    builder.addCase(updateRadiology.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateRadiology.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentRadiology = initialState.currentRadiology;
      state.radiologies = PaginatedListModel.resetPaginatedList(state.radiologies);
      state.error = "";
      AlertService.showAlert("تم تحديث الاشعة بنجاح", "success");
    });
    builder.addCase(updateRadiology.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete allergy
    builder.addCase(deleteRadiology.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteRadiology.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.radiologies = PaginatedListModel.resetPaginatedList(state.radiologies);
      AlertService.showAlert("تم حذف الاشعة بنجاح", "success");
    });
    builder.addCase(deleteRadiology.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single allergy details
    builder.addCase(getRadiologyDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getRadiologyDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentRadiology = action.payload;
      state.error = "";
    });
    builder.addCase(getRadiologyDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentRadiology = initialState.currentRadiology;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setRadiologyList,
  setCurrentRadiology,
  clearRadiologyList,
  clearCurrentRadiology,
  clearError,
} = radiologiesSlice.actions;
export default radiologiesSlice.reducer;
