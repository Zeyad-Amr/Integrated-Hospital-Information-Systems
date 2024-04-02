import BaseUseCase from "@/core/base/base-usecase";
import { CreateRoomUseCaseParameters } from "./usecase-params";
import BaseRoomRepository from "../../repositories/base-room-repository";

class CreateRoomUseCase
    implements BaseUseCase<boolean, CreateRoomUseCaseParameters> {
    constructor(private baseRoomRepository: BaseRoomRepository) { }

    async call(param: CreateRoomUseCaseParameters): Promise<boolean> {
        return await this.baseRoomRepository.createRoom(param.room);
    }
}

export default CreateRoomUseCase;


