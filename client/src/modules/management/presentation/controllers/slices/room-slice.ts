import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, updateRoom, getRoomDetails, getRoomList } from "../thunks/room-thunks";
import { RoomState } from "../types";
import { ErrorResponse, PaginatedListModel } from "@/core/api";
import RoomEntity from "@/modules/management/domain/entities/room-entity";
import RoomInterface from "@/modules/management/domain/interfaces/room-interface";
import AlertService from "@/core/shared/utils/alert-service";

//* Initial State
const initialState: RoomState = {
    rooms: PaginatedListModel.default(),
    currentRoom: RoomEntity.defaultValue(),
    isFetched: false,
    loading: false,
    error: "",
};

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        clearRoomError(state) {
            state.error = "";
        },
        clearCurrentRoom(state) {
            state.currentRoom = initialState.currentRoom;
        },
        clearRoomList(state) {
            state.rooms = initialState.rooms;
        },
        setCurrentRoom(state, action: { payload: RoomInterface, type: string }) {
            state.currentRoom = action.payload;
        },
        setRoomList(state, action: { payload: RoomInterface[], type: string }) {
            state.rooms.items = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all rooms from api
        builder.addCase(getRoomList?.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRoomList?.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms = action.payload;
            state.error = "";
            console.log('rooms List', action.payload);
        });
        builder.addCase(getRoomList?.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
            state.rooms = initialState.rooms;
        });

        //* create room 
        builder.addCase(createRoom.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(createRoom.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentRoom = initialState.currentRoom;
            state.error = "";
            AlertService.showAlert('تم اضافة غرفة بنجاح', 'success');
        });
        builder.addCase(createRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* update room 
        builder.addCase(updateRoom.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(updateRoom.fulfilled, (state, _action) => {
            state.loading = false;
            state.currentRoom = initialState.currentRoom;
            state.error = "";
            AlertService.showAlert('تم تحديث غرفة بنجاح', 'success')
        });
        builder.addCase(updateRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* delete room 
        builder.addCase(deleteRoom.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteRoom.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            AlertService.showAlert('تم حذف غرفة بنجاح', 'success')

        });
        builder.addCase(deleteRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            AlertService.showAlert(`${state.error}`, 'error');
        });

        //* get single room details
        builder.addCase(getRoomDetails.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRoomDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.currentRoom = action.payload;
            state.error = "";
        });
        builder.addCase(getRoomDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.currentRoom = initialState.currentRoom;
            AlertService.showAlert(`${state.error}`, 'error');
        });

    },
});

export const {
    clearRoomError,
    clearCurrentRoom,
    clearRoomList,
    setCurrentRoom,
    setRoomList,
    setLoading,
} = roomSlice.actions;
export default roomSlice.reducer;