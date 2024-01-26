import { ErrorResponse } from "@/core/api";
import { createTriagAX } from "../thunks/triagAX-thunk";
import { createSlice } from "@reduxjs/toolkit";
import { TriagAXState } from "../types";

//* Initial State
const initialState: TriagAXState = {
  triagData: {
    comorbidityIds: [],
    mainComplaint: "",
    LOCId: 0,
    transferTo: "",
    triageTypeId: 0,
    vitals: {
      CVP: 0,
      DBP: 0,
      GCS: 0,
      painScore: 0,
      PR: 0,
      RR: 0,
      SBP: 0,
      SpO2: 0,
      temp: 0,
    },
  },
  loading: false,
  error: "",
};

const triagAXSlice = createSlice({
  name: "triagAX",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //* create triagAX member
    builder.addCase(createTriagAX.pending, (state, _action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createTriagAX.fulfilled, (state, _action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createTriagAX.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as ErrorResponse).message;
    });
  },
});

export default triagAXSlice.reducer;
