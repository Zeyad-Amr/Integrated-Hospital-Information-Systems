import { createSlice } from "@reduxjs/toolkit";
import { PersonState } from "../types";
import { ErrorResponse } from "@/core/api";
import PersonEntity from "../../../domain/entities/person-entity";
import { getPerson } from "../thunks/person-thunk";

//* Initial State
const initialState: PersonState = {
    person: PersonEntity.defaultValue(),
    loading: false,
    error: "",
};

const personSlice = createSlice({
    name: "person",
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
        builder
            .addCase(getPerson.pending, (state, _action) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getPerson.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload;
                state.error = "";
            })
            .addCase(getPerson.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as ErrorResponse).message;
            })


    },
});

export const {
    clearError,
    setLoading,

} = personSlice.actions;
export default personSlice.reducer;