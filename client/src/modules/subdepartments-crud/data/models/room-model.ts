import RoomInterface from '../../domain/interfaces/room-interface';

export default class RoomModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(entity: RoomInterface): any {
        return {
            name: entity.name,
            location: entity.location ,
        }
    }

    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): RoomInterface {
        return {
            id: json.id,
            name: json.name,
            location: json.location,
        };
    }
}
