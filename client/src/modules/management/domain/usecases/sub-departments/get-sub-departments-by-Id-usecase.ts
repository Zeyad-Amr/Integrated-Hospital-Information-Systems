import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";
import { SubDepartmentInterface } from "../../interfaces/sub-departments-interface";


class GetSubDepartmentUseCase
  implements BaseUseCase<SubDepartmentInterface, string> {
  constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) { }

  async call(id: string): Promise<SubDepartmentInterface> {
    return await this.baseSubDepartmentsRepository.getSubDepartmentById(id);
  }
}

export default GetSubDepartmentUseCase;
