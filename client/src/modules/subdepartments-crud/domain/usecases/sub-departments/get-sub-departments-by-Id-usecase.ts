import BaseUseCase from "@/core/base/base-usecase";
import BaseSubDepartmentsRepository from "../../repositories/base-sub-departments-repository";
import SubDepartmentsInterface from "../../interfaces/sub-departments-interface";

class GetSubDepartmentUseCase
  implements BaseUseCase<SubDepartmentsInterface, string>
{
  constructor(private baseSubDepartmentsRepository: BaseSubDepartmentsRepository) {}

  async call(id : string): Promise<SubDepartmentsInterface> {
    return await this.baseSubDepartmentsRepository.getSubDepartmentById(id);
  }
}

export default GetSubDepartmentUseCase;
