import { AdditionalDataInterface } from "./additional-data-interface";
import { CompanionInterface } from "./companion-interface";

export default interface IncidentInterface {
    numOfPatients?: string;
    additionalInfo?: AdditionalDataInterface
    companions?: CompanionInterface[]
}