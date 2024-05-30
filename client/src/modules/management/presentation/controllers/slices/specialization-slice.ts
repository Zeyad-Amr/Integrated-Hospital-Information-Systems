import { createSlice } from "@reduxjs/toolkit";
import { createSpecialization, deleteSpecialization, getSpecializationDetails, getSpecializationList, updateSpecializations } from "../thunks/specialization-thunks";
import { SpecializationState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import SpecializationEntity from "@/modules/management/domain/entities/specialization-entity";
import SpecializationInterface from "@/modules/management/domain/interfaces/specialization -interface";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: SpecializationState = {
    specializations: PaginatedListModel.default(),
    currentSpecialization: SpecializationEntity.defaultValue(),
    isFetched: false,
    loading: false,
    error: "",
};

const specializationSlice = createSlice({
    name: "specializations",
    initialState,
    reducers: {
        clearSpecializationError(state) {
            state.error = "";
        },
        clearCurrentSpecialization(state) {
            state.currentSpecialization = initialState.currentSpecialization;
        },
        clearSpecializationList(state) {
            state.specializations = initialState.specializations;
        },
        setCurrentSpecialization(state, action: { payload: SpecializationInterface, type: string }) {
            state.currentSpecialization = action.payload;
        },
        setSpecializationList(state, action: { payload: SpecializationInterface[], type: string }) {
            state.specializations.items = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all specializations from api
        builder.addCase(getSpecializationList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getSpecializationList.fulfilled, (state, action) => {
            state.loading = false;
            state.specializations = action.payload;
            state.error = "";
            console.log('getSpecializationList', action.payload);
        });
        builder.addCase(getSpecializationList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.specializations = initialState.specializations;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* create specialization 
        builder.addCase(createSpecialization.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createSpecialization.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentSpecialization = initialState.currentSpecialization;
            state.error = "";
            AlertService.showAlert('تم اضافة تخصص بنجاح', 'success')
        });
        builder.addCase(createSpecialization.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update specialization 
        builder.addCase(updateSpecializations.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateSpecializations.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentSpecialization = initialState.currentSpecialization;
            state.error = "";
            AlertService.showAlert('تم تحديث تخصص بنجاح', 'success')
        });
        builder.addCase(updateSpecializations.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete specialization 
        builder.addCase(deleteSpecialization.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteSpecialization.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert('تم حذف تخصص بنجاح', 'success')
        });
        builder.addCase(deleteSpecialization.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get single specialization details
        builder.addCase(getSpecializationDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getSpecializationDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentSpecialization = action.payload;
            state.error = "";
        });
        builder.addCase(getSpecializationDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentSpecialization = initialState.currentSpecialization;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    },
});

export const {
    setLoading,
    setSpecializationList,
    setCurrentSpecialization,
    clearSpecializationList,
    clearCurrentSpecialization,
    clearSpecializationError,
} = specializationSlice.actions;
export default specializationSlice.reducer;