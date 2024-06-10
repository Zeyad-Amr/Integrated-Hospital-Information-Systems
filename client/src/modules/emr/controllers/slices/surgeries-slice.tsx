import { createSlice } from "@reduxjs/toolkit";
import { SurgeriesState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import SurgeriesModel from "../../models/surgeries-model";
import { SurgeriesInterface } from "../../interfaces/surgeries-interface";
import {
  createSurgery,
  deleteSurgery,
  getSurgeriesList,
  getSurgeryDetails,
  updateSurgery,
} from "../thunks/surgeries-thunk";

//* Initial State
const initialState: SurgeriesState = {
  surgeries: PaginatedListModel.default(),
  currentSurgery: SurgeriesModel.defaultValues(),
  isFetched: false,
  loading: false,
  error: "",
};

const surgeriesSlice = createSlice({
  name: "surgeries",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    clearCurrentSurgery(state) {
      state.currentSurgery = initialState.currentSurgery;
    },
    clearSurgeryList(state) {
      state.surgeries = initialState.surgeries;
    },
    setCurrentSurgery(
      state,
      action: { payload: SurgeriesInterface; type: string }
    ) {
      state.currentSurgery = action.payload;
    },
    setSurgeryList(
      state,
      action: { payload: SurgeriesInterface[]; type: string }
    ) {
      state.surgeries.items = action.payload;
    },
    setLoading(state, action: { payload: boolean; type: string }) {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    //* get all surgeries from api
    builder.addCase(getSurgeriesList?.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSurgeriesList?.fulfilled, (state, action) => {
      state.loading = false;
      state.surgeries = action.payload;
      state.error = "";
      console.log("getSurgeriesList", action.payload);
    });
    builder.addCase(getSurgeriesList?.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
      state.surgeries = initialState.surgeries;
    });

    //* create Surgery
    builder.addCase(createSurgery.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createSurgery.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentSurgery = initialState.currentSurgery;
      state.surgeries = PaginatedListModel.resetPaginatedList(state.surgeries);
      state.error = "";
      AlertService.showAlert("تم اضافة جراحة بنجاح", "success");
    });
    builder.addCase(createSurgery.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* update Surgery
    builder.addCase(updateSurgery.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateSurgery.fulfilled, (state, _action) => {
      state.loading = false;
      state.currentSurgery = initialState.currentSurgery;
      state.surgeries = PaginatedListModel.resetPaginatedList(state.surgeries);
      state.error = "";
      AlertService.showAlert("تم تحديث جراحة بنجاح", "success");
    });
    builder.addCase(updateSurgery.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* delete Surgery
    builder.addCase(deleteSurgery.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteSurgery.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
      state.surgeries = PaginatedListModel.resetPaginatedList(state.surgeries);
      AlertService.showAlert("تم حذف جراحة بنجاح", "success");
    });
    builder.addCase(deleteSurgery.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      AlertService.showAlert(`${state.error}`, "error");
    });

    //* get single Surgery details
    builder.addCase(getSurgeryDetails.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSurgeryDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.currentSurgery = action.payload;
      state.error = "";
    });
    builder.addCase(getSurgeryDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
      state.currentSurgery = initialState.currentSurgery;
      AlertService.showAlert(`${state.error}`, "error");
    });
  },
});

export const {
  setLoading,
  setSurgeryList,
  setCurrentSurgery,
  clearSurgeryList,
  clearCurrentSurgery,
  clearError,
} = surgeriesSlice.actions;
export default surgeriesSlice.reducer;
