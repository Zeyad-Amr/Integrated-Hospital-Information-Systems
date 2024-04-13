import RoomInterface from "../interfaces/room-interface";

export default class RoomEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): RoomInterface {
        return {
            id: '',
            name : '',
            location : '',
        };
    }
}
