import { ApiClient, Endpoints, FilterQuery, PaginatedList, PaginatedListModel } from "@/core/api";
import RoomInterface from "../../domain/interfaces/room-interface";
import RoomModel from "../models/room-model";

abstract class BaseRoomDataSource {
    abstract createRoom(room: RoomInterface): Promise<boolean>;
    abstract updateRoom(room: RoomInterface): Promise<boolean>;
    abstract getAllRooms(filters: FilterQuery[]): Promise<PaginatedList<RoomInterface>>;
    abstract getRoomById(roomId: string): Promise<RoomInterface>;
    abstract deleteRoomById(roomId: string): Promise<boolean>;
}

class RoomDataSource extends BaseRoomDataSource {
    constructor(private apiClient: ApiClient) {
        super();
    }

    override async createRoom(room: RoomInterface): Promise<any> {
        const response = await this.apiClient.post(Endpoints.room.create, RoomModel.toJson(room));
        return response.data;
    }

    override async updateRoom(room: RoomInterface): Promise<boolean> {
        await this.apiClient.patch(Endpoints.room.update, RoomModel.toJson(room), {
            pathVariables: { id: room.id },
        });
        return true;
    }

    override async getAllRooms(filters: FilterQuery[]): Promise<PaginatedList<RoomInterface>> {
        const response = await this.apiClient.get(Endpoints.room.list, { filters: filters });

        console.log(response.data);

        return PaginatedListModel.fromJson<RoomInterface>(response.data, response.data.items.map((item: any) => RoomModel.fromJson(item)), filters);
    }

    override async getRoomById(id: string): Promise<RoomInterface> {
        const response = await this.apiClient.get(Endpoints.room.details, {
            pathVariables: { id: id },
        });
        return RoomModel.fromJson(response.data);
    }

    override async deleteRoomById(id: string): Promise<boolean> {
        await this.apiClient.delete(Endpoints.room.delete, {
            pathVariables: { id: id },
        });
        return true;
    }

}

export { RoomDataSource, BaseRoomDataSource };