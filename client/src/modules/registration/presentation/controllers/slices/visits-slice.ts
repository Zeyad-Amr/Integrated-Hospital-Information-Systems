import { createSlice } from "@reduxjs/toolkit";
import {
    createVisit,
    updateVisitPatient,
    getAnonymousVisits,
    getVisitByCode,
} from "../thunks/visits-thunks";
import { VisitsState } from "../types";
import { ErrorResponse } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import { PaginatedListModel } from "@/core/api/pagination";

//* Initial State
const initialState: VisitsState = {
    visits: PaginatedListModel.default(),
    currentVisit: VisitEntity.defaultValue(),
    loading: false,
    error: "",
};

const visitSlice = createSlice({
    name: "visit",
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        },
    },
    extraReducers(builder) {
        //* Create Visit
        builder.addCase(createVisit.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createVisit.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.visits.items.push(action.payload);
            state.visits = PaginatedListModel.resetPaginatedList(state.visits)
            AlertService.showAlert('تم اضافة زيارة مريض بنجاح', 'success');
            console.log('state.visits', state.visits);
        });
        builder.addCase(createVisit.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* Update Visit
        builder.addCase(updateVisitPatient.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateVisitPatient.fulfilled, (state, _action) => {
            state.loading = false;
            AlertService.showAlert('تم تحديث بيانات زيارة مريض بنجاح', 'success');
            state.visits = PaginatedListModel.resetPaginatedList(state.visits)
            state.error = "";
        });
        builder.addCase(updateVisitPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* Get Anonymous Visit
        builder.addCase(getAnonymousVisits.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAnonymousVisits.fulfilled, (state, action) => {
            state.loading = false;
            state.visits = action.payload;
            state.visits = PaginatedListModel.updatePaginatedList(state.visits, action.payload);
            state.error = "";
        });
        builder.addCase(getAnonymousVisits.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* Get Visit By Code
        builder.addCase(getVisitByCode.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getVisitByCode.fulfilled, (state, action) => {
            state.loading = false;
            state.currentVisit = action.payload;
            state.error = "";
        });
        builder.addCase(getVisitByCode.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });
    },
});

export const {
    setLoading,
} = visitSlice.actions;
export default visitSlice.reducer;