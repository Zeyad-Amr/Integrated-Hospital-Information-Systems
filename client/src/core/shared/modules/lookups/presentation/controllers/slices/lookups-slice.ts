import { createSlice } from "@reduxjs/toolkit";
import { LookupsState } from "../types";
import { ErrorResponse } from "@/core/api";
import { getLookups } from "../thunks/lookups-thuck";
import LookupsEntity from "../../../domain/entities/lookups-entity";

//* Initial State
const initialState: LookupsState = {
    lookups: LookupsEntity.defaultValue(),
    loading: false,
    error: "",
};

const lookupsSlice = createSlice({
    name: "lookups",
    initialState,
    reducers: {
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        },
        clearError(state) {
            state.error = "";
        },

    },
    extraReducers(builder) {


        //* Lookup Tables
        builder.addCase(getLookups.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getLookups.fulfilled, (state, action) => {
            state.loading = false;
            state.lookups = action.payload;
            state.error = "";
        });
        builder.addCase(getLookups.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });


    },
});

export const {
    clearError,
    setLoading,

} = lookupsSlice.actions;
export default lookupsSlice.reducer;