import IncidentEntity from "@/modules/registration/domain/entities/incident-entity";
import { IncidentState } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { createIncident } from "../thunks/incident-thunk";
import { ErrorResponse } from "@/core/api";

//* Initial State
const initialState: IncidentState = {
    incidents: [],
    currentIncident: IncidentEntity.defaultValue(),
    loading: false,
    error: "",
};

const incidentSlice = createSlice({
    name: "incident",
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        },
        clearError(state) {
            state.error = initialState.error;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createIncident.pending, (state, _action) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createIncident.fulfilled, (state, _action) => {
                state.loading = false;
                state.error = "";
            })
            .addCase(createIncident.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as ErrorResponse).message;
            })
    }

})


export const {
    clearError,
    setLoading,
} = incidentSlice.actions;
export default incidentSlice.reducer;