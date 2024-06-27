import { ErrorResponse } from "@/core/api";
import { createTriagAX } from "../thunks/triagAX-thunk";
import { createSlice } from "@reduxjs/toolkit";
import { TriagAXState } from "../types";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: TriagAXState = {
  triagData: {},
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
    })
      .addCase(createTriagAX.fulfilled, (state, _action) => {
        state.loading = false;
        state.error = "";
        AlertService.showAlert( 'تم اضافة نموذج فحص الفرز الأولي للمريض بنجاح' , 'success');
      })
      .addCase(createTriagAX.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as ErrorResponse).message;
        AlertService.showAlert( `${state.error}` , 'error');
      });
  },
});

export default triagAXSlice.reducer;
