import RoomInterface from "../../domain/interfaces/room-interface";

// Define the initial state using that type
export interface RoomState {
    roomList: RoomInterface[];
    currentRoom: RoomInterface;
    loading: boolean;
    error: string;
}