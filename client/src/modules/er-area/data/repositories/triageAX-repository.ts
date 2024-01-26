import { ErrorResponse, ErrorMessage } from "@/core/api";
import BaseTriageAXRepository from "../../domain/repositories/base-triageAX-repository";
import { TriageAXInterface } from "../../domain/interfaces/triageAX-interface";
import { BaseTriageAXDataSource } from "../datasources/triageAX-datasource";

class TriageAXRepository extends BaseTriageAXRepository {
  constructor(private triageAXDataSource: BaseTriageAXDataSource) {
    super();
  }
  async createTriageAX(triageAX: TriageAXInterface): Promise<void> {
    try {
      await this.triageAXDataSource.createTriageAX(triageAX);
    } catch (error) {
      const errorResponse: ErrorResponse =
        error instanceof Error ? ErrorMessage.get(error.message) : error;
      throw errorResponse;
    }
  }
}

export default TriageAXRepository;
