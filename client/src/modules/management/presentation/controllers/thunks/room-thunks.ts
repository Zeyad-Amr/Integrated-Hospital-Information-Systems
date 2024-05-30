import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllRoomsUseCase from "@/modules/management/domain/usecases/rooms/get-all-rooms-usecase";
import RoomInterface from "@/modules/management/domain/interfaces/room-interface";
import CreateRoomUseCase from "@/modules/management/domain/usecases/rooms/create-room-usecase";
import {
  CreateRoomUseCaseParameters,
  DeleteRoomUseCaseParameters,
  GetRoomByIdUseCaseParameters,
  UpdateRoomUseCaseParameters,
} from "@/modules/management/domain/usecases/rooms/usecase-params";
import UpdateRoomUseCase from "@/modules/management/domain/usecases/rooms/update-room-usecase";
import DeleteRoomUseCase from "@/modules/management/domain/usecases/rooms/delete-room-usecase";
import GetRoomByIdUseCase from "@/modules/management/domain/usecases/rooms/get-room-by-Id-usecase";
import { FilterQuery } from "@/core/api";

//* Get All Rooms
export const getRoomList = createAsyncThunk(
  "rooms/get",
  async (filters: FilterQuery[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllRoomsUseCase>(ServiceKeys.GetAllRoomsUseCase)
        .call(filters);
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Create Room
export const createRoom = createAsyncThunk(
  "rooms/create",
  async (data: RoomInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateRoomUseCase>(ServiceKeys.CreateRoomUseCase)
        .call(new CreateRoomUseCaseParameters(data));
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Update Room
export const updateRoom = createAsyncThunk(
  "rooms/update",
  async (data: RoomInterface, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<UpdateRoomUseCase>(ServiceKeys.UpdateRoomUseCase)
        .call(new UpdateRoomUseCaseParameters(data));
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Delete Room
export const deleteRoom = createAsyncThunk(
  "rooms/delete",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<DeleteRoomUseCase>(ServiceKeys.DeleteRoomUseCase)
        .call(new DeleteRoomUseCaseParameters(id));
      console.log("Result:", result);
      return id;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);

//* Get Single Room Details by Id
export const getRoomDetails = createAsyncThunk(
  "rooms/get/details",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetRoomByIdUseCase>(ServiceKeys.GetRoomByIdUseCase)
        .call(new GetRoomByIdUseCaseParameters(id));
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error);
    }
  }
);
