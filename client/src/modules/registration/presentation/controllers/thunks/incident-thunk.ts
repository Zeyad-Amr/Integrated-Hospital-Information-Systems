import IncidentInterface from "@/modules/registration/domain/interfaces/incident-interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import CreateIncidentUseCase from "@/modules/registration/domain/usecases/incident/create-incident-usecase";
import { FilterQuery } from "@/core/api";
import GetAllIncidentsUseCase from "@/modules/registration/domain/usecases/incident/get-all-incidents-usecase";
import { CompleteVisitInterface } from "@/modules/registration/domain/interfaces/complete-visit-interface";
import { UpdateVisitUseCase } from "@/modules/registration/domain/usecases/visit";


//* Create Incident
export const createIncident = createAsyncThunk(
    "incident/create",
    async (data: IncidentInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<CreateIncidentUseCase>(ServiceKeys.CreateIncidentUseCase).call(data)
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);


//* Get Incidents
export const getAllIncidents = createAsyncThunk(
    "incident/get",
    async (filters: FilterQuery[], thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAllIncidentsUseCase>(ServiceKeys.GetAllIncidentsUseCase).call(filters);
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);

//* Update Incident
export const updateIncidentPatient = createAsyncThunk(
    "registration/incident/update",
    async (data: CompleteVisitInterface, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<UpdateVisitUseCase>(ServiceKeys.UpdateVisitUseCase).call(data);
            console.log('Result:', result);
            return result;
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error);
        }
    }
);