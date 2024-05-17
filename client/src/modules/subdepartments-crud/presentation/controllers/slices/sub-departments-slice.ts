import { createSlice } from "@reduxjs/toolkit";
import { updateSubDepartmentAssignFeatures ,  createSubDepartment , deleteSubDepartment ,getSubDepartmentDetails ,getSubDepartmentsList , updateSubDepartment } from "../thunks/sub-departments-thunks ";
import { SubDepartmentsState } from "../types";
import { ErrorResponse } from "@/core/api";
import SubDepartmentsEntity from "@/modules/subdepartments-crud/domain/entities/sub-departments-entity";
import {SubDepartmentsInterface} from "@/modules/subdepartments-crud/domain/interfaces/sub-departments-interface";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: SubDepartmentsState = {
    subDepartmentsList: [],
    currentSubDepartment: SubDepartmentsEntity.defaultValue(),
    loading: false,
    error: "",
};

const subDepartmentsSlice = createSlice({
    name: "subdepartment",
    initialState,
    reducers: {
        clearSubDepartmentsError(state) {
            state.error = "";
        },
        clearCurrentSubDepartment(state) {
            state.currentSubDepartment = initialState.currentSubDepartment;
        },
        clearSubDepartmentsList(state) {
            state.subDepartmentsList = [];
        },
        setCurrentSubDepartment(state, action: { payload: SubDepartmentsInterface, type: string }) {
            state.currentSubDepartment = action.payload;
        },
        setSubDepartmentsList(state, action: { payload: SubDepartmentsInterface[], type: string }) {
            state.subDepartmentsList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all subdepartments from api
        builder.addCase(getSubDepartmentsList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getSubDepartmentsList.fulfilled, (state, action) => {
            state.loading = false;
            state.subDepartmentsList = action.payload;
            state.error = "";
            console.log('getSubDepartmentsList', action.payload);
        });
        builder.addCase(getSubDepartmentsList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.subDepartmentsList = [];
            AlertService.showAlert( `${state.error}` , 'error');
        });

        //* create subdepartment 
        builder.addCase(createSubDepartment.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createSubDepartment.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentSubDepartment = initialState.currentSubDepartment;
            state.error = "";
            AlertService.showAlert( 'تم اضافة قسم فرعي بنجاح' , 'success')
        });
        builder.addCase(createSubDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert( `${state.error}` , 'error');
        });

        //* update subdepartment 
        builder.addCase(updateSubDepartment.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateSubDepartment.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentSubDepartment = initialState.currentSubDepartment;
            state.error = "";
            AlertService.showAlert( 'تم تحديث قسم فرعي بنجاح' , 'success')
        });
        builder.addCase(updateSubDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert( `${state.error}` , 'error');
        });

        //* update subdepartment assignfeatures
        builder.addCase(updateSubDepartmentAssignFeatures.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateSubDepartmentAssignFeatures.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert( 'تم اضافة صلاحيات لوظائف القسم الفرعي بنجاح' , 'success')
        });
        builder.addCase(updateSubDepartmentAssignFeatures.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert( `${state.error}` , 'error');
        });

        //* delete subdepartment 
        builder.addCase(deleteSubDepartment.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteSubDepartment.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.subDepartmentsList = state.subDepartmentsList.filter((subDEpartment : SubDepartmentsInterface) => subDEpartment.id !== _action.payload);
            AlertService.showAlert( 'تم حذف قسم فرعي بنجاح' , 'success')
        });
        builder.addCase(deleteSubDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert( `${state.error}` , 'error');
        });

        //* get single subdepartment details
        builder.addCase(getSubDepartmentDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getSubDepartmentDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentSubDepartment = action.payload;
            state.error = "";
        });
        builder.addCase(getSubDepartmentDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentSubDepartment = initialState.currentSubDepartment;
            AlertService.showAlert( `${state.error}` , 'error');
        });

    },
});

export const {
    setLoading,
    clearSubDepartmentsError,
    clearCurrentSubDepartment,
    clearSubDepartmentsList,
    setCurrentSubDepartment,
    setSubDepartmentsList,
} = subDepartmentsSlice.actions;
export default subDepartmentsSlice.reducer;