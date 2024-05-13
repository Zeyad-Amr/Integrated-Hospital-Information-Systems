import RoomInterface from "../../interfaces/room-interface";

class GetRoomByIdUseCaseParameters {
    constructor(public id: string) { }
}

class CreateRoomUseCaseParameters {
    constructor(public room: RoomInterface) { }
}

class UpdateRoomUseCaseParameters {
    constructor(public room: RoomInterface) { }
}

class DeleteRoomUseCaseParameters {
    constructor(public id: string) { }
}


export {
    GetRoomByIdUseCaseParameters,
    CreateRoomUseCaseParameters,
    UpdateRoomUseCaseParameters,
    DeleteRoomUseCaseParameters
};
