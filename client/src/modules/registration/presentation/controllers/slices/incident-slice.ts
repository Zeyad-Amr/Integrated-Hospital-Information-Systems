import IncidentEntity from "@/modules/registration/domain/entities/incident-entity";
import { IncidentsState } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import { createIncident, getAllIncidents, updateIncidentPatient } from "../thunks/incident-thunk";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: IncidentsState = {
    incidents: PaginatedListModel.default(),
    currentIncident: IncidentEntity.defaultValue(),
    loading: false,
    error: "",
};

const incidentSlice = createSlice({
    name: "incidents",
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
                AlertService.showAlert('تم اضافة اصابة جماعية بنجاح', 'success');
            })
            .addCase(createIncident.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as ErrorResponse).message;
                AlertService.showAlert(`${state.error}`, 'error');
            })

        //* Get Incidents
        builder.addCase(getAllIncidents.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllIncidents.fulfilled, (state, action) => {
            state.loading = false;
            state.incidents = action.payload;
            state.error = "";
        });
        builder.addCase(getAllIncidents.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* Update Visit
        builder.addCase(updateIncidentPatient.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateIncidentPatient.fulfilled, (state, _action) => {
            state.loading = false;
            AlertService.showAlert('تم تحديث بيانات زيارة مريض بنجاح', 'success');
            state.incidents = PaginatedListModel.resetPaginatedList(state.incidents)
            state.error = "";
        });
        builder.addCase(updateIncidentPatient.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    }

})


export const {
    clearError,
    setLoading,
} = incidentSlice.actions;
export default incidentSlice.reducer;