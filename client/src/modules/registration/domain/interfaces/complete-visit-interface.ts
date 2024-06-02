import PersonInterface from "@/core/shared/modules/person/domain/interfaces/person-interface";
import { CompanionInterface } from "./companion-interface";

export interface CompleteVisitInterface {
  patient: PersonInterface;
  companion?: CompanionInterface;
  visitCode: string;
}
