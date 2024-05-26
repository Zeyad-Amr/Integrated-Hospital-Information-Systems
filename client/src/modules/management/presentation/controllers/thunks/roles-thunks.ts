import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllRolesUseCase from "@/modules/management/domain/usecases/roles/get-all-roles-usecase";
import RoleInterface from "@/modules/management/domain/interfaces/role-interface";
import CreateRoleUseCase from "@/modules/management/domain/usecases/roles/create-role-usecase";
import UpdateRoleUseCase from "@/modules/management/domain/usecases/roles/update-role-usecase";
import DeleteRoleUseCase from "@/modules/management/domain/usecases/roles/delete-role-usecase";
import GetRoleUseCase from "@/modules/management/domain/usecases/roles/get-role-by-Id-usecase";

//* Get All roles
export const getRolesList = createAsyncThunk(
  "roles/get",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllRolesUseCase>(ServiceKeys.GetAllRolesUseCase)
        .call();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Create role
export const createRole = createAsyncThunk(
  "roles/create",
  async (data: RoleInterface, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateRoleUseCase>(ServiceKeys.CreateRoleUseCase)
        .call(data).then(() => {
          dispatch(getRolesList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update role
export const updateRole = createAsyncThunk(
  "roles/update",
  async (data: RoleInterface, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const result = await sl
        .get<UpdateRoleUseCase>(ServiceKeys.UpdateRoleUseCase)
        .call(data).then(() => {
          dispatch(getRolesList())
        })
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Delete role
export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (id: string, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    try {
      const result = await sl
        .get<DeleteRoleUseCase>(ServiceKeys.DeleteRoleUseCase)
        .call(id).then(() => {
          dispatch(getRolesList())
        })
      console.log("Result:", result);
      return id;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Get Single role Details by Id
export const getRoleDetails = createAsyncThunk(
  "roles/get/details",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetRoleUseCase>(ServiceKeys.GetRoleByIdUseCase)
        .call(id);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
