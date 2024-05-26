import { FilterQuery, PaginatedList } from "@/core/api";
import RoomInterface from "../interfaces/room-interface";

abstract class BaseRoomRepository {
    abstract createRoom(room: RoomInterface): Promise<boolean>;
    abstract updateRoom(room: RoomInterface): Promise<boolean>;
    abstract getAllRooms(filters: FilterQuery[]): Promise<PaginatedList<RoomInterface>>;
    abstract getRoomById(roomId: string): Promise<RoomInterface>;
    abstract deleteRoomById(roomId: string): Promise<boolean>;
}

export default BaseRoomRepository;