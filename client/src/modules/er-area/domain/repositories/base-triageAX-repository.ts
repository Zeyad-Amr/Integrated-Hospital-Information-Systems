import {TriageAXInterface} from "../interfaces/triageAX-interface";

export default abstract class BaseTriageAXRepository {
    abstract createTriageAX(triageAX: TriageAXInterface): Promise<void>;
}