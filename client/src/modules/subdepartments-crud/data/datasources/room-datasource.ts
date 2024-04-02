import { ApiClient, Endpoints } from "@/core/api";
import RoomInterface from "../../domain/interfaces/room-interface";
import RoomModel from "../models/room-model";

abstract class BaseRoomDataSource {
    abstract createRoom(room: RoomInterface): Promise<boolean>;
    abstract updateRoom(room: RoomInterface): Promise<boolean>;
    abstract getAllRooms(): Promise<RoomInterface[]>;
    abstract getRoomById(roomId: string): Promise<RoomInterface>;
    abstract deleteRoomById(roomId: string): Promise<boolean>;
}

class RoomDataSource extends BaseRoomDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createRoom(room : RoomInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.room.create, RoomModel.toJson(room));
        return response.data;
    }

    override async updateRoom(room : RoomInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.room.update, RoomModel.toJson(room) , {
            pathVariables: { id: room.id },
        } );
        return true;
    }

    override async getAllRooms(): Promise<RoomInterface[]> {
        const response = await this.apiClient.get(Endpoints.room.list);
        console.log(response.data);
        return response.data.map((room: any) => RoomModel.fromJson(room));
    }

    override async getRoomById(id: string): Promise<RoomInterface> {
        const response = await this.apiClient.get(Endpoints.room.details, {
            pathVariables: { id: id },
        });
        return RoomModel.fromJson(response.data);
    }

    override async deleteRoomById(id: string): Promise<boolean> {
        await this.apiClient.get(Endpoints.room.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { RoomDataSource, BaseRoomDataSource };