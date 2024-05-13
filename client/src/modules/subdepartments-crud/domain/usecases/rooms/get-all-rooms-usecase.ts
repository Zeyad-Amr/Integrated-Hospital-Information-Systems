import BaseUseCase from "@/core/base/base-usecase";
import RoomInterface from "../../interfaces/room-interface";
import BaseRoomRepository from "../../repositories/base-room-repository";

class GetAllRoomsUseCase
    implements BaseUseCase<RoomInterface[], void> {
    constructor(private baseRoomRepository: BaseRoomRepository) { }

    async call(): Promise<RoomInterface[]> {
        return await this.baseRoomRepository.getAllRooms();
    }
}

export default GetAllRoomsUseCase;
