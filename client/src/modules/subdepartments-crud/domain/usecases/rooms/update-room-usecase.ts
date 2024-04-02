import BaseUseCase from "@/core/base/base-usecase";
import { UpdateRoomUseCaseParameters } from "./usecase-params";
import BaseRoomRepository from "../../repositories/base-room-repository";

class UpdateRoomUseCase
    implements BaseUseCase<boolean, UpdateRoomUseCaseParameters> {
    constructor(private baseRoomRepository: BaseRoomRepository) { }

    async call(param: UpdateRoomUseCaseParameters): Promise<boolean> {
        return await this.baseRoomRepository.updateRoom(param.room);
    }
}

export default UpdateRoomUseCase;
