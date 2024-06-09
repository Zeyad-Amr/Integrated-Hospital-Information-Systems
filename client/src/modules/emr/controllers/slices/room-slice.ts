// import { createSlice } from "@reduxjs/toolkit";
// import {  TestState } from "../types";
// import { ErrorResponse } from "@/core/api";
// import AlertService from "@/core/shared/utils/alert-service";
// import { createTestCase } from "../thunks/test-thunks";

// //* Initial State
// const initialState: TestState = {
//     test : "",
//     loading: false,
//     error: "",
// };

// const testSlice = createSlice({
//     name: "tests",
//     initialState,
//     reducers: {
//         //* Define all reducers will be used in module
//         setLoading(state, action: { payload: boolean, type: string }) {
//             state.loading = action.payload;
//         }
//     },
//     extraReducers(builder) {

//         //* create test 
//         builder.addCase(createTestCase.pending, (state, _action) => {
//             state.loading = true;
//             state.error = "";
//         });
//         builder.addCase(createTestCase.fulfilled, (state, _action) => {
//             state.loading = false;
//             state.test = initialState.test;
//             state.error = "";
//             AlertService.showAlert('تم اضافة تيست بنجاح', 'success');
//         });
//         builder.addCase(createTestCase.rejected, (state, action) => {
//             state.loading = false;
//             state.error = (action.payload as ErrorResponse).message;
//             AlertService.showAlert(`${state.error}`, 'error');
//         });

      

//     },
// });

// export const {
//     setLoading,
// } = testSlice.actions;
// export default testSlice.reducer;