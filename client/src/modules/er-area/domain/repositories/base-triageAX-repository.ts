import { TriageAXInterface, TriageTransferInterface } from "../interfaces/triageAX-interface";

export default abstract class BaseTriageAXRepository {
    abstract createTriageAX(triageAX: TriageAXInterface, visitCode: string): Promise<void>;
    abstract createTriageTransfer(triageAX: TriageTransferInterface, visitCode: string): Promise<void>;
}