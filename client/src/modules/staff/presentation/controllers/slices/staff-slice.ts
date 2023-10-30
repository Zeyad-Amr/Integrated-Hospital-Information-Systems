import { createSlice } from "@reduxjs/toolkit";
import { getStaffList } from "../thunks/staff-thunks";
import { StaffState } from "../types";

// Define the initial state using that type
const initialState: StaffState = {
    staffList: [],
    loading: false,
    error: "",
};


const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {},
    extraReducers(builder) {

        // get staff from api
        builder.addCase(getStaffList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getStaffList.fulfilled, (state, action) => {
            state.loading = false;
            state.staffList = action.payload;
            state.error = "";
        });
        builder.addCase(getStaffList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default staffSlice.reducer;