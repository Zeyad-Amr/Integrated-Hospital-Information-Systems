import RoomInterface from "../interfaces/room-interface";

abstract class BaseRoomRepository {
    abstract createRoom(room: RoomInterface): Promise<boolean>;
    abstract updateRoom(room: RoomInterface): Promise<boolean>;
    abstract getAllRooms(): Promise<RoomInterface[]>;
    abstract getRoomById(roomId: string): Promise<RoomInterface>;
    abstract deleteRoomById(roomId: string): Promise<boolean>;
}

export default BaseRoomRepository;