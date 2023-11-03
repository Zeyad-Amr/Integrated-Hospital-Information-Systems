import { createSlice } from "@reduxjs/toolkit";
import { getStaffList, createStaff, updateStaff, deleteStaff, getStaffDetails } from "../thunks/staff-thunks";
import { StaffState } from "../types";
import StaffEntity from "@/modules/staff/domain/entities/staff-entity";

//* Initial State
const initialState: StaffState = {
    staffList: [],
    currentStaffMember: null,
    loading: false,
    error: "",
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        clearStaffError(state) {
            state.error = "";
        },
        clearCurrentStaffMember(state) {
            state.currentStaffMember = null;
        },
        clearStaffList(state) {
            state.staffList = [];
        },
        setCurrentStaffMember(state, action: { payload: StaffEntity, type: string }) {
            state.currentStaffMember = action.payload;
        },
        setStaffList(state, action: { payload: StaffEntity[], type: string }) {
            state.staffList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get staff from api
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
            state.staffList = [];
        });

        //* create staff member
        builder.addCase(createStaff.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createStaff.fulfilled, (state, action) => {
            state.loading = false;
            state.currentStaffMember = action.payload;
            state.error = "";
        });
        builder.addCase(createStaff.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* update staff member
        builder.addCase(updateStaff.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateStaff.fulfilled, (state, action) => {
            state.loading = false;
            state.currentStaffMember = action.payload;
            state.error = "";
        });
        builder.addCase(updateStaff.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* delete staff member
        builder.addCase(deleteStaff.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteStaff.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.staffList = state.staffList.filter((staff) => staff.id !== _action.payload);

        });
        builder.addCase(deleteStaff.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        //* get staff details
        builder.addCase(getStaffDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getStaffDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentStaffMember = action.payload;
            state.error = "";
        });
        builder.addCase(getStaffDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.currentStaffMember = null;
        });

    },
});

export const {
    clearStaffError,
    clearCurrentStaffMember,
    clearStaffList,
    setCurrentStaffMember,
    setStaffList,
    setLoading
} = staffSlice.actions;
export default staffSlice.reducer;