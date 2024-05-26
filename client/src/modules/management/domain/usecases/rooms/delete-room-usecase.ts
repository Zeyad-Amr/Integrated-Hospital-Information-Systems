import BaseUseCase from "@/core/base/base-usecase";
import { DeleteRoomUseCaseParameters } from "./usecase-params";
import BaseRoomRepository from "../../repositories/base-room-repository";

class DeleteRoomUseCase
    implements BaseUseCase<boolean, DeleteRoomUseCaseParameters> {
    constructor(private baseRoomRepository: BaseRoomRepository) { }

    async call(param: DeleteRoomUseCaseParameters): Promise<boolean> {
        return await this.baseRoomRepository.deleteRoomById(param.id);
    }
}

export default DeleteRoomUseCase;
