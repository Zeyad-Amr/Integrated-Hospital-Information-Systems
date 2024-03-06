import { AdditionalDataInterface } from "./additional-data-interface";
import { CompanionInterface } from "./visit-interface";

export default interface IncidentInterface {
    numOfPatients?: string;
    additionalInfo?: AdditionalDataInterface
    companions?: CompanionInterface[]
}