import { createSlice } from "@reduxjs/toolkit";
import { AllergiesState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import AllergiesModel from "../../models/allergies-model";
import { AllergiesInterface } from "../../interfaces/allergies-interface";
import { getAllergiesList , createAllergy , deleteAllergy ,getAllergyDetails , updateAllergy } from "../thunks/allergies-thunk";

//* Initial State
const initialState: AllergiesState = {
    allergies: PaginatedListModel.default(),
    currentAllergy : AllergiesModel.defaultValues(),
    isFetched: false,
    loading: false,
    error: "",
};

const allergiesSlice = createSlice({
    name: "allergies",
    initialState,
    reducers: {
        clearError(state) {
            state.error = "";
        },
        clearCurrentAllergy(state) {
            state.currentAllergy = initialState.currentAllergy;
        },
        clearAllergyList(state) {
            state.allergies = initialState.allergies;
        },
        setCurrentAllergy(state, action: { payload: AllergiesInterface, type: string }) {
            state.currentAllergy = action.payload;
        },
        setAllergyList(state, action: { payload: AllergiesInterface[], type: string }) {
            state.allergies.items = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all allergies from api
        builder.addCase(getAllergiesList?.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllergiesList?.fulfilled, (state, action) => {
            state.loading = false;
            state.allergies = PaginatedListModel.updatePaginatedList(state.allergies, action.payload);
            state.error = "";
            console.log('getAllergiesList', action.payload);
        });
        builder.addCase(getAllergiesList?.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
            state.allergies = initialState.allergies;
        });

        //* create allergy 
        builder.addCase(createAllergy.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createAllergy.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentAllergy = initialState.currentAllergy;
            state.allergies = PaginatedListModel.resetPaginatedList(state.allergies)
            state.error = "";
            AlertService.showAlert('تم اضافة حساسية بنجاح', 'success');
        });
        builder.addCase(createAllergy.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update allergy 
        builder.addCase(updateAllergy.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateAllergy.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentAllergy = initialState.currentAllergy;
            state.allergies = PaginatedListModel.resetPaginatedList(state.allergies)
            state.error = "";
            AlertService.showAlert('تم تحديث حساسية بنجاح', 'success')
        });
        builder.addCase(updateAllergy.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete allergy 
        builder.addCase(deleteAllergy.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteAllergy.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.allergies = PaginatedListModel.resetPaginatedList(state.allergies)
            AlertService.showAlert('تم حذف حساسية بنجاح', 'success')

        });
        builder.addCase(deleteAllergy.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get single allergy details
        builder.addCase(getAllergyDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllergyDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentAllergy = action.payload;
            state.error = "";
        });
        builder.addCase(getAllergyDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentAllergy = initialState.currentAllergy;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    },
});

export const {
    setLoading,
    setAllergyList,
    setCurrentAllergy,
    clearAllergyList,
    clearCurrentAllergy,
    clearError,
} = allergiesSlice.actions;
export default allergiesSlice.reducer;