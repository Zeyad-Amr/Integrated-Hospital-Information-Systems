import BaseUseCase from "@/core/base/base-usecase";
import { GetRoomByIdUseCaseParameters } from "./usecase-params";
import RoomInterface from "../../interfaces/room-interface";
import BaseRoomRepository from "../../repositories/base-room-repository";

class GetRoomByIdUseCase
  implements BaseUseCase<RoomInterface, GetRoomByIdUseCaseParameters>
{
  constructor(private baseRoomRepository: BaseRoomRepository) {}

  async call(param: GetRoomByIdUseCaseParameters): Promise<RoomInterface> {
    return await this.baseRoomRepository.getRoomById(param.id);
  }
}

export default GetRoomByIdUseCase;
