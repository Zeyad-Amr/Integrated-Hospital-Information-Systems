import { createAsyncThunk } from "@reduxjs/toolkit";
import { sl, ServiceKeys } from "@/core/service-locator";
import GetAllRoomsUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/get-all-rooms-usecase";
import RoomInterface from "@/modules/subdepartments-crud/domain/interfaces/room-interface";
import CreateRoomUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/create-room-usecase";
import {
  CreateRoomUseCaseParameters,
  DeleteRoomUseCaseParameters,
  GetRoomByIdUseCaseParameters,
  UpdateRoomUseCaseParameters,
} from "@/modules/subdepartments-crud/domain/usecases/rooms/usecase-params";
import UpdateRoomUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/update-room-usecase";
import DeleteRoomUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/delete-room-usecase";
import GetRoomByIdUseCase from "@/modules/subdepartments-crud/domain/usecases/rooms/get-room-by-Id-usecase";

//* Get All Rooms
export const getRoomList = createAsyncThunk(
  "rooms/get",
  async (_data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const result = await sl
        .get<GetAllRoomsUseCase>(ServiceKeys.GetAllRoomsUseCase)
        .call();
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
    const { rejectWithValue , dispatch  } = thunkApi;
    try {
      console.log("Thunk", data);
      const result = await sl
        .get<CreateRoomUseCase>(ServiceKeys.CreateRoomUseCase)
        .call(new CreateRoomUseCaseParameters(data)).then(() => {
          dispatch(getRoomList())
        })
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
    const { rejectWithValue , dispatch  } = thunkApi;
    try {
      const result = await sl
        .get<UpdateRoomUseCase>(ServiceKeys.UpdateRoomUseCase)
        .call(new UpdateRoomUseCaseParameters(data)).then(() => {
          dispatch(getRoomList())
        })
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
    const { rejectWithValue , dispatch  } = thunkApi;
    try {
      const result = await sl
        .get<DeleteRoomUseCase>(ServiceKeys.DeleteRoomUseCase)
        .call(new DeleteRoomUseCaseParameters(id)).then(() => {
          dispatch(getRoomList())
        })
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
