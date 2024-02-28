import { AttendantRole, CameFromOptions, } from "@/core/shared/modules/lookups/domain/interfaces/lookups-interface"

export interface AdditionalDataInterface {
    comeFrom?: CameFromOptions
    attendantName?: string;
    attendantSSN?: string;
    attendantSerialNumber?: string;
    attendantRole?: AttendantRole
    carNum?: number;
    firstChar?: string;
    secondChar?: string;
    thirdChar?: string;
    reason?: string;
    place?: string;
    notes?: string;
}
