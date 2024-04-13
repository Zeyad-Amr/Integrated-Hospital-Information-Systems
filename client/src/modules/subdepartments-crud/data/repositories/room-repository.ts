import { ErrorResponse, ErrorMessage } from "@/core/api";
import { BaseRoomDataSource } from "../datasources/room-datasource";
import RoomInterface from "../../domain/interfaces/room-interface";

class RoomRepository extends BaseRoomDataSource {
    constructor(private baseRoomDataSource: BaseRoomDataSource) {
        super();
    }

    override async createRoom(room: RoomInterface): Promise<boolean> {
        try {
            await this.baseRoomDataSource.createRoom(room);
            return true;
        } catch (error) {
            console.log(error)
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            console.log(errorResponse);
            throw errorResponse;
        }
    }

    override async updateRoom(room: RoomInterface): Promise<boolean> {
        try {
            await this.baseRoomDataSource.updateRoom(room);
            return true;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getAllRooms(): Promise<RoomInterface[]> {
        try {
            const result = await this.baseRoomDataSource.getAllRooms();
            console.log(result,"getAllRooms");
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async getRoomById(id: string): Promise<RoomInterface> {
        try {
            const result = await this.baseRoomDataSource.getRoomById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }

    override async deleteRoomById(id: string): Promise<boolean> {
        try {
            const result = await this.baseRoomDataSource.deleteRoomById(id);
            return result;
        } catch (error) {
            const errorResponse: ErrorResponse = error instanceof Error ? ErrorMessage.get(error.message) : error;
            throw errorResponse;
        }
    }
}

export default RoomRepository;