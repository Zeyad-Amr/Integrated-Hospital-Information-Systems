import { createSlice } from "@reduxjs/toolkit";
import { MedicalProblemsState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import MedicalProblemsModel from "../../models/medical-problems-model";
import { createMedicalProblem, deleteMedicalProblem, getMedicalProblemDetails , getMedicalProblemsList , updateMedicalProblem } from "../thunks/medical-problems-thunk";
import { MedicalProblemsInterface } from "../../interfaces/medical-problems-interface";

//* Initial State
const initialState: MedicalProblemsState = {
    medicalProblems: PaginatedListModel.default(),
    currentMedicalProblem : MedicalProblemsModel.defaultValues(),
    isFetched: false,
    loading: false,
    error: "",
};

const medicalProblemsSlice = createSlice({
    name: "medicalProblems",
    initialState,
    reducers: {
        clearError(state) {
            state.error = "";
        },
        clearCurrentMedicalProblem(state) {
            state.currentMedicalProblem = initialState.currentMedicalProblem;
        },
        clearMedicalProblemList(state) {
            state.medicalProblems = initialState.medicalProblems;
        },
        setCurrentMedicalProblem(state, action: { payload: MedicalProblemsInterface, type: string }) {
            state.currentMedicalProblem = action.payload;
        },
        setMedicalProblemList(state, action: { payload: MedicalProblemsInterface[], type: string }) {
            state.medicalProblems.items = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all MedicalProblems from api
        builder.addCase(getMedicalProblemsList?.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getMedicalProblemsList?.fulfilled, (state, action) => {
            state.loading = false;
            state.medicalProblems = PaginatedListModel.updatePaginatedList(state.medicalProblems, action.payload);
            state.error = "";
            console.log('medicalProblems', action.payload);
        });
        builder.addCase(getMedicalProblemsList?.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
            state.medicalProblems = initialState.medicalProblems;
        });

        //* create MedicalProblem 
        builder.addCase(createMedicalProblem.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createMedicalProblem.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentMedicalProblem = initialState.currentMedicalProblem;
            state.medicalProblems = PaginatedListModel.resetPaginatedList(state.medicalProblems)
            state.error = "";
            AlertService.showAlert('تم اضافة مشكلة طبية بنجاح', 'success');
        });
        builder.addCase(createMedicalProblem.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update MedicalProblem 
        builder.addCase(updateMedicalProblem.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateMedicalProblem.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentMedicalProblem = initialState.currentMedicalProblem;
            state.medicalProblems = PaginatedListModel.resetPaginatedList(state.medicalProblems)
            state.error = "";
            AlertService.showAlert('تم تحديث مشكلة طبية بنجاح', 'success')
        });
        builder.addCase(updateMedicalProblem.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete MedicalProblem 
        builder.addCase(deleteMedicalProblem.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteMedicalProblem.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.medicalProblems = PaginatedListModel.resetPaginatedList(state.medicalProblems)
            AlertService.showAlert('تم حذف مشكلة طبية بنجاح', 'success')

        });
        builder.addCase(deleteMedicalProblem.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get single MedicalProblem details
        builder.addCase(getMedicalProblemDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getMedicalProblemDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentMedicalProblem = action.payload;
            state.error = "";
        });
        builder.addCase(getMedicalProblemDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentMedicalProblem = initialState.currentMedicalProblem;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    },
});

export const {
    setLoading,
    setMedicalProblemList,
    setCurrentMedicalProblem,
    clearMedicalProblemList,
    clearCurrentMedicalProblem,
    clearError,
} = medicalProblemsSlice.actions;
export default medicalProblemsSlice.reducer;