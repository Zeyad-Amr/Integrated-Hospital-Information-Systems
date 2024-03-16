import { createSlice } from "@reduxjs/toolkit";
import {
    createVisit,
    updateVisit,
    getAnonymousVisits,
    getVisitByCode,
} from "../thunks/visits-thunks";
import { VisitsState } from "../types";
import VisitEntity from "@/modules/registration/domain/entities/visit-entity";
import { ErrorResponse } from "@/core/api";
import VisitInterface from "@/modules/registration/domain/interfaces/visit-interface";

//* Initial State
const initialState: VisitsState = {
    visits: [],
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
        clearError(state) {
            state.error = initialState.error;
        },
        clearVisit(state) {
            state.visits = initialState.visits;
        },
        clearCurrentVisit(state) {
            state.currentVisit = initialState.currentVisit;
        },
        setVisit(state, action: { payload: VisitInterface[], type: string }) {
            state.visits = action.payload;
        },
        setCurrentVisit(state, action: { payload: VisitInterface, type: string }) {
            state.currentVisit = action.payload;
        }

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
            state.visits = [action.payload]
            console.log('state.visits', state.visits);
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

        //* Get Anonymous Visit
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
    clearError,
    setLoading,
    clearVisit,
    setVisit,
    clearCurrentVisit,
    setCurrentVisit

} = visitSlice.actions;
export default visitSlice.reducer;