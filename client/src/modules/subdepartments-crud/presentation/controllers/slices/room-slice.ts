import { createSlice } from "@reduxjs/toolkit";
import { createRoom , deleteRoom , updateRoom , getRoomDetails , getRoomList } from "../thunks/room-thunks";
import { RoomState } from "../types";
import { ErrorResponse } from "@/core/api";
import RoomEntity from "@/modules/subdepartments-crud/domain/entities/room-entity";
import RoomInterface from "@/modules/subdepartments-crud/domain/interfaces/room-interface";

//* Initial State
const initialState: RoomState = {
    roomList: [],
    currentRoom: RoomEntity.defaultValue(),
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
            state.roomList = [];
        },
        setCurrentRoom(state, action: { payload: RoomInterface, type: string }) {
            state.currentRoom = action.payload;
        },
        setRoomList(state, action: { payload: RoomInterface[], type: string }) {
            state.roomList = action.payload;
        },
        setLoading(state, action: { payload: boolean, type: string }) {
            state.loading = action.payload;
        }
    },
    extraReducers(builder) {
        //* get all rooms from api
        builder.addCase(getRoomList.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getRoomList.fulfilled, (state, action) => {
            state.loading = false;
            state.roomList = action.payload;
            state.error = "";
            console.log('rooms List', action.payload);
        });
        builder.addCase(getRoomList.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
            state.roomList = [];
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
        });
        builder.addCase(createRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
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
        });
        builder.addCase(updateRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
        });

        //* delete room 
        builder.addCase(deleteRoom.pending, (state, _action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(deleteRoom.fulfilled, (state, _action) => {
            state.loading = false;
            state.error = "";
            state.roomList = state.roomList.filter((room : RoomInterface) => room.id !== _action.payload);

        });
        builder.addCase(deleteRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as ErrorResponse).message;
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