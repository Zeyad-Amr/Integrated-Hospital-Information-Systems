import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllSubDepartmentsUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/get-all-sub-departments-usecase";
import { SubDepartmentsInterface , SubDepartmentsAssignFeaturesInterface } from "@/modules/subdepartments-crud/domain/interfaces/sub-departments-interface";
import CreateSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/create-sub-department-usecase";
import UpdateSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/update-sub-department-usecase";
import DeleteSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/delete-sub-department-usecase";
import GetSubDepartmentUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/get-sub-departments-by-Id-usecase";
import UpdateSubDepartmentAssignFeaturesUseCase from "@/modules/subdepartments-crud/domain/usecases/sub-departments/update-sub-department-assign-features-usecase";

//* Get All SubDepartments
export const getSubDepartmentsList = createAsyncThunk(
  "subdepartment/get",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllSubDepartmentsUseCase>(
          ServiceKeys.GetAllSubDepartmentsUseCase
        )
        .call();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Create SubDepartment
export const createSubDepartment = createAsyncThunk(
  "subdepartment/create",
  async (data: SubDepartmentsInterface, thunkApi) => {
    const { rejectWithValue , dispatch } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateSubDepartmentUseCase>(
          ServiceKeys.CreateSubDepartmentUseCase
        )
        .call(data).then(() => {
          dispatch(getSubDepartmentsList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update SubDepartment
export const updateSubDepartment = createAsyncThunk(
  "subdepartment/update",
  async (data: SubDepartmentsInterface, thunkApi) => {
    const { rejectWithValue , dispatch } = thunkApi;
    try {
      const result = await sl
        .get<UpdateSubDepartmentUseCase>(
          ServiceKeys.UpdateSubDepartmentUseCase
        )
        .call(data).then(() => {
          dispatch(getSubDepartmentsList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update SubDepartment assignfeatures
export const updateSubDepartmentAssignFeatures = createAsyncThunk(
  "subdepartment/update/assignfeatures",
  async (data: SubDepartmentsAssignFeaturesInterface, thunkApi) => {
    const { rejectWithValue , dispatch } = thunkApi;
    try {
      const result = await sl
        .get<UpdateSubDepartmentAssignFeaturesUseCase>(
          ServiceKeys.UpdateSubDepartmentAssignFeaturesUseCase
        )
        .call(data).then(() => {
          dispatch(getSubDepartmentsList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Delete SubDepartment
export const deleteSubDepartment = createAsyncThunk(
  "subdepartment/delete",
  async (id: string, thunkApi) => {
    const { rejectWithValue , dispatch } = thunkApi;
    try {
      const result = await sl
        .get<DeleteSubDepartmentUseCase>(
          ServiceKeys.DeleteSubDepartmentUseCase
        )
        .call(id).then(() => {
          dispatch(getSubDepartmentsList())
        })
      console.log("Result:", result);
      return id;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Get Single SubDepartment Details by Id
export const getSubDepartmentDetails = createAsyncThunk(
  "subdepartment/get/details",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetSubDepartmentUseCase>(
          ServiceKeys.GetSubDepartmentByIdUseCase
        )
        .call(id);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
