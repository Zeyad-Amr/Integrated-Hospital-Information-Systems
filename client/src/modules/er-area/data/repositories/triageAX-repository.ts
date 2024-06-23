import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseTriageAXRepository from "../../domain/repositories/base-triageAX-repository";
import { TriageAXInterface, TriageTransferInterface } from "../../domain/interfaces/triageAX-interface";
import { BaseTriageAXDataSource } from "../datasources/triageAX-datasource";

class TriageAXRepository extends BaseTriageAXRepository {
  constructor(private triageAXDataSource: BaseTriageAXDataSource) {
    super();
  }
  async createTriageAX(triageAX: TriageAXInterface, visitCode: string): Promise<void> {
    try {
      await this.triageAXDataSource.createTriageAX(triageAX, visitCode);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      throw errorResponse;
    }
  }
  async createTriageTransfer(triageAX: TriageTransferInterface, visitCode: string): Promise<void> {
    try {
      await this.triageAXDataSource.createTriageTransfer(triageAX, visitCode);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      throw errorResponse;
    }
  }
}

export default TriageAXRepository;
