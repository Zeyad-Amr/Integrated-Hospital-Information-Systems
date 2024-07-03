import { AdditionalDataInterface } from "./additional-data-interface";
import { CompanionInterface } from "./companion-interface";
import VisitInterface from "./visit-interface";

export default interface IncidentInterface {
    numOfPatients ?: string;
    numberOfIncompletedVisits?: string;
    additionalInfo?: AdditionalDataInterface;
    companions?: CompanionInterface[];
    visits?: VisitInterface[];
    createdAt?: Date;
    updatedAt?: Date;
}