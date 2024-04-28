import { createSlice } from "@reduxjs/toolkit";
import { createFeature, deleteFeature ,getFeatureDetails ,getFeaturesList , updateFeature } from "../thunks/features-thunks";
import { FeaturesState } from "../types";
import { ErrorResponse } from "@/core/api";
import FeatureEntity from "@/modules/subdepartments-crud/domain/entities/feature-entity";
import FeatureInterface from "@/modules/subdepartments-crud/domain/interfaces/feature-interface";

//* Initial State
const initialState: FeaturesState = {
    featuresList: [],
    currentFeature: FeatureEntity.defaultValue(),
    loading: false,
    error: "",
};

const featuresSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        clearFeaturesError(state) {
            state.error = "";
        },
        clearCurrentFeature(state) {
            state.currentFeature = initialState.currentFeature;
        },
        clearFeaturesList(state) {
            state.featuresList = [];
        },
        setCurrentFeature(state, action: { payload: FeatureInterface, type: string }) {
            state.currentFeature = action.payload;
        },
        setFeaturesList(state, action: { payload: FeatureInterface[], type: string }) {
            state.featuresList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all subdepartments from api
        builder.addCase(getFeaturesList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getFeaturesList.fulfilled, (state, action) => {
            state.loading = false;
            state.featuresList = action.payload;
            state.error = "";
            console.log('getFeaturesList', action.payload);
        });
        builder.addCase(getFeaturesList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.featuresList = [];
        });

        //* create subdepartment 
        builder.addCase(createFeature.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createFeature.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentFeature = initialState.currentFeature;
            state.error = "";
        });
        builder.addCase(createFeature.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* update subdepartment 
        builder.addCase(updateFeature.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateFeature.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentFeature = initialState.currentFeature;
            state.error = "";
        });
        builder.addCase(updateFeature.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* delete subdepartment 
        builder.addCase(deleteFeature.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteFeature.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.featuresList = state.featuresList.filter((feature : FeatureInterface) => feature.id !== _action.payload);

        });
        builder.addCase(deleteFeature.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* get single subdepartment details
        builder.addCase(getFeatureDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getFeatureDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentFeature = action.payload;
            state.error = "";
        });
        builder.addCase(getFeatureDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentFeature = initialState.currentFeature;
        });

    },
});

export const {
    setLoading,
    setFeaturesList,
    setCurrentFeature,
    clearFeaturesList,
    clearCurrentFeature,
    clearFeaturesError,
} = featuresSlice.actions;
export default featuresSlice.reducer;