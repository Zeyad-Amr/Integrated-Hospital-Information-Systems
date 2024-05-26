import BaseUseCase from "@/core/base/base-usecase";
import RoomInterface from "../../interfaces/room-interface";
import BaseRoomRepository from "../../repositories/base-room-repository";
import { FilterQuery, PaginatedList } from "@/core/api";

class GetAllRoomsUseCase
    implements BaseUseCase<PaginatedList<RoomInterface>, FilterQuery[]> {
    constructor(private baseRoomRepository: BaseRoomRepository) { }

    async call(params: FilterQuery[]): Promise<PaginatedList<RoomInterface>> {
        return await this.baseRoomRepository.getAllRooms(params);
    }
}

export default GetAllRoomsUseCase;
