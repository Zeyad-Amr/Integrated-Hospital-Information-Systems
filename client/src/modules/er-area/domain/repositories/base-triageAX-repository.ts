import { TriageAXInterface, TriageTransferInterface } from "../interfaces/triageAX-interface";

export default abstract class BaseTriageAXRepository {
    abstract createTriageAX(triageAX: TriageAXInterface): Promise<void>;
    abstract createTriageTransfer(triageAX: TriageTransferInterface, visitCode: string): Promise<void>;
}