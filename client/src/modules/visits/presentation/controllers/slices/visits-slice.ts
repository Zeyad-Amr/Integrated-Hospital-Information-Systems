import { createSlice } from "@reduxjs/toolkit";
import {
    createVisit,
    updateVisit,
    getAnonymousVisits,
    getVisitByCode,
} from "../thunks/visits-thunks";
import { VisitsState } from "../types";
import VisitEntity from "@/modules/visits/domain/entities/visit-entity";
import { ErrorResponse } from "@/core/api";

//* Initial State
const initialState: VisitsState = {
    visits: [],
    currentVisit: VisitEntity.defaultValue(),
    loading: false,
    error: "",
};

const authSlice = createSlice({
    name: "visits",
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        },
        clearAuthError(state) {
            state.error = initialState.error;
        },
        clearVisits(state) {
            state.visits = initialState.visits;
        },
        clearCurrentVisit(state) {
            state.currentVisit = initialState.currentVisit;
        },
        setVisits(state, action: { payload: VisitEntity[], type: string }) {
            state.visits = action.payload;
        },
        setCurrentVisit(state, action: { payload: VisitEntity, type: string }) {
            state.currentVisit = action.payload;
        }

    },
    extraReducers(builder) {
        //* Create Visit
        builder.addCase(createVisit.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createVisit.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(createVisit.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* Update Visit
        builder.addCase(updateVisit.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateVisit.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
        });
        builder.addCase(updateVisit.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* Get Anonymous Visits
        builder.addCase(getAnonymousVisits.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAnonymousVisits.fulfilled, (state, action) => {
            state.loading = false;
            state.visits = action.payload;
            state.error = "";
        });
        builder.addCase(getAnonymousVisits.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
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
        });
    },
});

export const {
    clearAuthError,
    setLoading,
    clearVisits,
    setVisits,
    clearCurrentVisit,
    setCurrentVisit

} = authSlice.actions;
export default authSlice.reducer;