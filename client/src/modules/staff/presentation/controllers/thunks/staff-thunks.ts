import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import {
    GetAllStaffMembersUseCase,
    CreateStaffMemberUseCase,
    UpdateStaffMemberUseCase,
    DeleteStaffMemberUseCase,
    GetStaffDetailsUseCase,
    CreateStaffMemberUseCaseParameters,
    UpdateStaffMemberUseCaseParameters,
    DeleteStaffMemberUseCaseParameters,
    GetStaffDetailsUseCaseParameters
} from "@/modules/staff/domain/usecases";
import StaffEntity from "@/modules/staff/domain/entities/staff-entity";

//* Get All Staff Members 
export const getStaffList = createAsyncThunk(
    "staff/get",
    async (_data, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetAllStaffMembersUseCase>(ServiceKeys.GetAllStaffMembersUseCase).call();
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Create Staff Member
export const createStaff = createAsyncThunk(
    "staff/create",
    async (_data: StaffEntity, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<CreateStaffMemberUseCase>(ServiceKeys.CreateStaffMemberUseCase).call(
                new CreateStaffMemberUseCaseParameters(_data)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Update Staff Member
export const updateStaff = createAsyncThunk(
    "staff/update",
    async (_data: StaffEntity, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<UpdateStaffMemberUseCase>(ServiceKeys.UpdateStaffMemberUseCase).call(
                new UpdateStaffMemberUseCaseParameters(_data)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Delete Staff Member
export const deleteStaff = createAsyncThunk(
    "staff/delete",
    async (_id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<DeleteStaffMemberUseCase>(ServiceKeys.DeleteStaffMemberUseCase).call(
                new DeleteStaffMemberUseCaseParameters(_id)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight() === true ? _id : "";
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

//* Get Staff Member Details by Id
export const getStaffDetails = createAsyncThunk(
    "staff/get/details",
    async (_id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const result = await sl.get<GetStaffDetailsUseCase>(ServiceKeys.GetStaffDetailsUseCase).call(
                new GetStaffDetailsUseCaseParameters(_id)
            );
            result.fold(
                (error) => console.log(error),
                (success) => console.log(success)
            );
            return result.getRight();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

