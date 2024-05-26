import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllPermissionsUseCase from "@/modules/management/domain/usecases/permissions/get-all-permissions-usecase";
import PermissionInterface from "@/modules/management/domain/interfaces/permission-interface";
import CreatePermissionUseCase from "@/modules/management/domain/usecases/permissions/create-permission-usecase";
import UpdatePermissionUseCase from "@/modules/management/domain/usecases/permissions/update-permission-usecase";
import DeletePermissionUseCase from "@/modules/management/domain/usecases/permissions/delete-permission-usecase";
import GetPermissionUseCase from "@/modules/management/domain/usecases/permissions/get-permission-by-Id-usecase";

//* Get All permissions
export const getPermissionsList = createAsyncThunk(
  "permissions/get",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllPermissionsUseCase>(ServiceKeys.GetAllPermissionsUseCase)
        .call();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Create permission
export const createPermission = createAsyncThunk(
  "permissions/create",
  async (data: PermissionInterface, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreatePermissionUseCase>(ServiceKeys.CreatePermissionUseCase)
        .call(data).then(() => {
          dispatch(getPermissionsList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update permission
export const updatePermission = createAsyncThunk(
  "permissions/update",
  async (data: PermissionInterface, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const result = await sl
        .get<UpdatePermissionUseCase>(ServiceKeys.UpdatePermissionUseCase)
        .call(data).then(() => {
          dispatch(getPermissionsList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Delete permission
export const deletePermission = createAsyncThunk(
  "permissions/delete",
  async (id: string, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const result = await sl
        .get<DeletePermissionUseCase>(ServiceKeys.DeletePermissionUseCase)
        .call(id).then(() => {
          dispatch(getPermissionsList())
        })
      console.log("Result:", result);
      return id;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Get Single permission Details by Id
export const getPermissionDetails = createAsyncThunk(
  "permissions/get/details",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetPermissionUseCase>(ServiceKeys.GetPermissionByIdUseCase)
        .call(id);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
